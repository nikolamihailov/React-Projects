// One-time migration: moves every image into Vercel Blob as resized WebP and
// points the database at the new URLs.
//
//   node scripts/migrate-images-to-blob.js           dry run: downloads and converts, uploads and changes nothing
//   node scripts/migrate-images-to-blob.js --apply   upload to Blob and update the database
//
// Covers product, category and store images and user avatars, whether they are
// external links or base64 data stored in MongoDB. Broken links listed in
// scripts/image-replacements.json are swapped for the replacement image.
// Already-migrated images are skipped, so it is safe to run again.
//
// Before writing, the original values are saved to scripts/backups/ so the
// change can be reverted. Nothing is deleted from Blob or anywhere else.
// Needs BLOB_READ_WRITE_TOKEN in .env when run with --apply.

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { put } = require("@vercel/blob");
const { FOLDERS, isBlobUrl, toWebp } = require("../src/utils/blob");

const apply = process.argv.includes("--apply");
const CONCURRENCY = 4;

const TARGETS = [
    { collection: "products", folder: "products", fields: ["mainImage", "imageTwo", "imageThree", "imageFour"] },
    { collection: "categories", folder: "categories", fields: ["categoryImage"] },
    { collection: "stores", folder: "stores", fields: ["storeImage"] },
    { collection: "users", folder: "avatars", fields: ["avatar"] },
];

const replacements = new Map(
    require("./image-replacements.json").map((r) => [`${r.id}:${r.field}`, r.url])
);

const describe = (value) => (value.startsWith("data:") ? `base64 (${Math.round(value.length * 0.75 / 1024)}KB)` : value);

const loadSource = async (value) => {
    if (value.startsWith("data:")) {
        return Buffer.from(value.slice(value.indexOf(",") + 1), "base64");
    }
    const res = await fetch(value, {
        headers: { "User-Agent": "Mozilla/5.0 (image migration)" },
        signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
};

const runPool = async (jobs) => {
    const queue = [...jobs];
    const worker = async () => {
        while (queue.length) await queue.shift()();
    };
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
};

const run = async () => {
    if (apply && !process.env.BLOB_READ_WRITE_TOKEN) {
        throw new Error("BLOB_READ_WRITE_TOKEN is missing from .env");
    }
    await mongoose.connect(process.env.MONGO_DB_URL_SEC + process.env.DB_NAME);
    const db = mongoose.connection.db;

    const stats = { migrated: 0, replaced: 0, skipped: 0, failed: 0, bytesBefore: 0, bytesAfter: 0 };
    const failures = [];
    const backup = [];
    const jobs = [];

    for (const { collection, folder, fields } of TARGETS) {
        const projection = Object.fromEntries(fields.map((f) => [f, 1]));
        const docs = await db.collection(collection).find({}, { projection }).toArray();

        for (const doc of docs) {
            for (const field of fields) {
                const current = doc[field];
                if (!current) continue;
                if (isBlobUrl(current)) {
                    stats.skipped++;
                    continue;
                }
                const replacement = replacements.get(`${doc._id}:${field}`);
                const source = replacement || current;

                jobs.push(async () => {
                    const label = `${collection}.${field} ${doc._id}`;
                    try {
                        const original = await loadSource(source);
                        const webp = await toWebp(original, FOLDERS[folder]);
                        stats.bytesBefore += original.length;
                        stats.bytesAfter += webp.length;

                        if (apply) {
                            const blob = await put(`${folder}/image.webp`, webp, {
                                access: "public",
                                contentType: "image/webp",
                                addRandomSuffix: true,
                                cacheControlMaxAge: 60 * 60 * 24 * 365,
                            });
                            // Raw collection update: no validators or updatedAt change for a storage move.
                            await db.collection(collection).updateOne({ _id: doc._id }, { $set: { [field]: blob.url } });
                            backup.push({ collection, id: String(doc._id), field, old: current, new: blob.url });
                        }
                        if (replacement) stats.replaced++;
                        else stats.migrated++;
                        console.log(`ok   ${label}  ${Math.round(original.length / 1024)}KB -> ${Math.round(webp.length / 1024)}KB${replacement ? "  (replacement)" : ""}`);
                    } catch (error) {
                        stats.failed++;
                        failures.push(`${label}: ${error.message}  [${describe(source).slice(0, 120)}]`);
                        console.log(`FAIL ${label}  ${error.message}`);
                    }
                });
            }
        }
    }

    await runPool(jobs);

    if (apply && backup.length) {
        const dir = path.join(__dirname, "backups");
        fs.mkdirSync(dir, { recursive: true });
        const file = path.join(dir, `images-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
        fs.writeFileSync(file, JSON.stringify(backup, null, 2));
        console.log(`\nOriginal values saved to ${file}`);
    }

    const mb = (b) => (b / 1024 / 1024).toFixed(2);
    console.log(`\n${apply ? "Applied" : "Dry run"}: ${stats.migrated} migrated, ${stats.replaced} replaced, ` +
        `${stats.skipped} already in Blob, ${stats.failed} failed`);
    console.log(`Size: ${mb(stats.bytesBefore)}MB -> ${mb(stats.bytesAfter)}MB`);
    if (failures.length) console.log("\nFailed (left unchanged):\n" + failures.join("\n"));
    if (!apply) console.log("\nNothing was changed. Run with --apply to upload and update the database.");
};

run()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => mongoose.disconnect());

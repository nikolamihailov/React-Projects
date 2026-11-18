const { put, del } = require("@vercel/blob");
const sharp = require("sharp");

// Folders the API may write to, with the largest side each image is resized to.
const FOLDERS = {
    products: 1600,
    categories: 1200,
    stores: 1600,
    avatars: 400,
};

const ACCEPTED_FORMATS = ["jpeg", "png", "webp", "gif", "avif", "tiff", "heif"];

const isBlobUrl = (url) => typeof url === "string" && /\.blob\.vercel-storage\.com\//.test(url);

const imageError = (message) => Object.assign(new Error(message), { isImageError: true });

// Every stored image goes through here, whatever the browser sent, so the
// store only ever holds resized WebP files.
const toWebp = async (input, maxSide) => {
    let format;
    try {
        ({ format } = await sharp(input).metadata());
    } catch {
        throw imageError("File is not a valid image!");
    }
    if (!ACCEPTED_FORMATS.includes(format)) throw imageError("Unsupported image format!");

    return sharp(input, { animated: false })
        .rotate() // apply the phone's EXIF orientation before metadata is dropped
        .resize({ width: maxSide, height: maxSide, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 80, effort: 4 })
        .toBuffer();
};

const uploadImage = async (folder, input) => {
    const webp = await toWebp(input, FOLDERS[folder]);
    const blob = await put(`${folder}/image.webp`, webp, {
        access: "public",
        contentType: "image/webp",
        addRandomSuffix: true,
        // Each upload gets a unique name, so the file never changes and can be cached for a year.
        cacheControlMaxAge: 60 * 60 * 24 * 365,
    });
    return blob.url;
};

// Removes images we host that are no longer referenced. Failures are only
// logged: a leftover file must never break the request that replaced it.
const deleteBlobs = async (urls) => {
    const ours = [...new Set(urls.filter(isBlobUrl))];
    if (ours.length === 0) return;
    try {
        await del(ours);
    } catch (error) {
        console.error("Blob delete failed", ours, error.message);
    }
};

// URLs present on the old document but not on the new one.
const replacedUrls = (before, after, fields) => {
    if (!before) return [];
    return fields
        .map((f) => before[f])
        .filter((url) => url && !fields.some((f) => after?.[f] === url));
};

module.exports = { FOLDERS, isBlobUrl, toWebp, uploadImage, deleteBlobs, replacedUrls };

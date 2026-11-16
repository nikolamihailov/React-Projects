// One-time cleanup: removes references to products that no longer exist
// from shopping carts and favourites, and deletes their reviews.
//
//   node scripts/cleanup-orphans.js           report only, changes nothing
//   node scripts/cleanup-orphans.js --apply   write the changes
//
// Orders are left alone on purpose: they are purchase history.

require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../src/models/Product");
const ShoppingCart = require("../src/models/ShoppingCart");
const User = require("../src/models/User");
const Review = require("../src/models/Review");

const apply = process.argv.includes("--apply");

const run = async () => {
    await mongoose.connect(process.env.MONGO_DB_URL_SEC + process.env.DB_NAME);

    const existing = new Set((await Product.find({}, "_id").lean()).map(p => p._id.toString()));
    const isOrphan = (id) => id && !existing.has(id.toString());

    const carts = await ShoppingCart.find({}, "products").lean();
    const orphanCartIds = new Set();
    let cartsAffected = 0;
    for (const cart of carts) {
        const orphans = cart.products.filter(p => isOrphan(p.product));
        if (orphans.length) cartsAffected++;
        orphans.forEach(p => orphanCartIds.add(p.product.toString()));
    }

    const users = await User.find({}, "favouriteProducts").lean();
    const orphanFavIds = new Set();
    let usersAffected = 0;
    for (const user of users) {
        const orphans = user.favouriteProducts.filter(isOrphan);
        if (orphans.length) usersAffected++;
        orphans.forEach(id => orphanFavIds.add(id.toString()));
    }

    const reviews = await Review.find({}, "product").lean();
    const orphanReviews = reviews.filter(r => isOrphan(r.product));

    console.log(`Products in DB:            ${existing.size}`);
    console.log(`Carts with deleted items:  ${cartsAffected} (${orphanCartIds.size} distinct missing products)`);
    console.log(`Users with deleted favs:   ${usersAffected} (${orphanFavIds.size} distinct missing products)`);
    console.log(`Reviews of deleted items:  ${orphanReviews.length}`);

    if (!apply) {
        console.log("\nReport only. Re-run with --apply to clean up.");
        return;
    }

    const cartIds = [...orphanCartIds].map(id => new mongoose.Types.ObjectId(id));
    const favIds = [...orphanFavIds].map(id => new mongoose.Types.ObjectId(id));
    // updateMany/deleteMany skip model save hooks (User re-hashes its password on save).
    // The filters match only affected documents, so others keep their updatedAt.
    const [cartRes, userRes, reviewRes] = await Promise.all([
        ShoppingCart.updateMany(
            { "products.product": { $in: cartIds } },
            { $pull: { products: { product: { $in: cartIds } } } }
        ),
        User.updateMany(
            { favouriteProducts: { $in: favIds } },
            { $pull: { favouriteProducts: { $in: favIds } } }
        ),
        Review.deleteMany({ _id: { $in: orphanReviews.map(r => r._id) } }),
    ]);

    console.log(`\nUpdated ${cartRes.modifiedCount} carts, ${userRes.modifiedCount} users; deleted ${reviewRes.deletedCount} reviews.`);
};

run()
    .catch((err) => {
        console.error(err);
        process.exitCode = 1;
    })
    .finally(() => mongoose.disconnect());

const mongoose = require("mongoose");

const shoppingCartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            validate: {
                validator: function (value) {
                    return value >= 1;
                },
                message: 'Product quantity must be a positive number!'
            },
            default: 1
        }
    }]
}, { timestamps: true });


/* shoppingCartSchema.virtual("totalPrice").get(async function () {
    // const allProducts = await ShoppingCart.findById(this._id).populate('products.product');
    console.log(this.products);
    return this.products.reduce((total, product) => {
        const price = product.product.hasPromoPrice ? product.product.promoPrice : product.product.price;
        return total + price * product.quantity;
    }, 0);
}); */

const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema);

module.exports = ShoppingCart;

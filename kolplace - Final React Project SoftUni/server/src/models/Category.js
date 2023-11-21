const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required!"],
        minLength: [3, "Category name must be at least 3 characters!"],
        maxLength: [20, "Category name must not be more than 20 characters!"],
        unique: true,
        validator: async function (name) {
            if (this.isModified('name') || this.isNew) {
                const category = await Category.findOne({ name });
                return !category;
            }
            return true;
        },
        message: 'Category with this name already exists!',
    },
    categoryImage: {
        type: String,
        required: [true, "Category Image is required!"],
        match: [/^https?:\/\/.+/, "Provide valid image link!"]
    }
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
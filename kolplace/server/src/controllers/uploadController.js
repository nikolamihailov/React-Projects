const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { FOLDERS, uploadImage } = require("../utils/blob");

const uploadController = express.Router();

// Vercel rejects request bodies over 4.5MB, so the browser shrinks images
// before sending them; the server then converts them to WebP.
const MAX_BYTES = 4 * 1024 * 1024;

uploadController.post(
    "/uploads",
    isAuthenticated,
    express.raw({ type: "image/*", limit: MAX_BYTES }),
    async (req, res) => {
        try {
            const folder = req.query.folder;
            if (!Object.hasOwn(FOLDERS, folder)) {
                return res.status(400).json({ errors: ["Unknown upload folder!"] });
            }
            // Everyone can change their own avatar; the rest is admin content.
            if (folder !== "avatars" && req.user.data.user.role !== "admin") {
                return res.status(401).json({ unathorized: "You have no power here!" });
            }
            if (!Buffer.isBuffer(req.body) || req.body.length === 0) {
                return res.status(400).json({ errors: ["No image was sent!"] });
            }
            const url = await uploadImage(folder, req.body);
            res.status(201).json({ url });
        } catch (error) {
            if (error.isImageError) return res.status(400).json({ errors: [error.message] });
            console.error("Upload failed", error);
            res.status(500).json({ errors: ["Image upload failed, please try again!"] });
        }
    }
);

// express.raw rejects bodies over the limit before our handler runs.
uploadController.use((error, req, res, next) => {
    if (error.type === "entity.too.large") {
        return res.status(413).json({ errors: ["Image is too large! It must be below 4MB."] });
    }
    next(error);
});

module.exports = uploadController;

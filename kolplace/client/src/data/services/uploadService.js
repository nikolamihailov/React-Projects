import imageCompression from "browser-image-compression";

const BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;

// Largest side per folder. The server resizes to the same sizes; shrinking
// here first keeps uploads fast and under Vercel's 4.5MB request limit.
const MAX_SIDE = {
    products: 1600,
    categories: 1200,
    stores: 1600,
    avatars: 400,
};

// Compresses the picked file to WebP in the browser, uploads it and returns
// the stored image URL. Throws an Error with a user-facing message on failure.
export const uploadImage = async (file, folder) => {
    if (!file.type.startsWith("image/")) throw new Error("Please choose an image file!");

    const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: MAX_SIDE[folder],
        fileType: "image/webp",
        initialQuality: 0.85,
        useWebWorker: true,
    });

    const headers = { "Content-Type": compressed.type || "image/webp" };
    const auth = JSON.parse(localStorage.getItem("kolplace-auth"));
    if (auth?.token) headers["X-Authorization"] = auth.token;

    const res = await fetch(`${BASE_URL}/uploads?folder=${folder}`, {
        method: "POST",
        headers,
        body: compressed,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.expMessage || data.errors?.[0] || data.unathorized || "Image upload failed!");
    }
    return data.url;
};

const Store = require("../models/Store");
const { deleteBlobs, replacedUrls } = require("../utils/blob");

exports.getAllStores = () => Store.find();

exports.getStoreById = (id) => Store.findById(id);

exports.createStore = (data) => Store.create(data);

exports.updateStore = async (id, data) => {
    const before = await Store.findById(id).lean();
    const updated = await Store.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    await deleteBlobs(replacedUrls(before, updated, ["storeImage"]));
    return updated;
};

exports.deleteStore = async (id) => {
    const deleted = await Store.findByIdAndDelete(id);
    if (deleted) await deleteBlobs([deleted.storeImage]);
    return deleted;
};

exports.getAllCount = () => Store.estimatedDocumentCount();

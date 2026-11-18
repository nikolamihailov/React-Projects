const Store = require("../models/Store");

exports.getAllStores = () => Store.find();

exports.getStoreById = (id) => Store.findById(id);

exports.createStore = (data) => Store.create(data);

exports.updateStore = (id, data) => Store.findByIdAndUpdate(id, data, { new: true, runValidators: true });

exports.deleteStore = (id) => Store.findByIdAndDelete(id);

exports.getAllCount = () => Store.estimatedDocumentCount();

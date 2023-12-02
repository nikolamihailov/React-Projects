const Store = require("../models/Store");

exports.getAllStores = () => Store.find();

exports.createStore = (data) => Store.create(data);
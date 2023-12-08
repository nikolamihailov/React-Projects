const Order = require("../models/Order");

exports.createOrder = (data) => Order.create(data);

exports.getAllOrdersForUser = (id) => Order.find({ maker: id }).populate("products.product");

exports.getOneOrder = (id) => Order.findById(id).populate("products.product");
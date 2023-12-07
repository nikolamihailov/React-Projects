const Order = require("../models/Order");

exports.createOrder = (data) => Order.create(data);
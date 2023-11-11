const User = require("../models/User");

exports.register = (data) => User.create(data);
const Review = require("../models/Review");

exports.createReview = (data) => Review.create(data);
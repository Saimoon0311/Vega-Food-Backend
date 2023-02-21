const mongoose = require("mongoose");

const schema = mongoose.Schema;

const productSchema = new schema({
  title: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  coverPicture: {
    type: String,
  },
  price: {
    type: String,
  },
  discountedPercentage: {
    type: String,
  },
  isDiscounted: {
    type: Boolean,
    default: false,
  },
  topping: {
    type: Array,
  },
  hotalID: String,
  phoneNunber: {
    type: String,
    // require: true,
  },
  city: {
    type: String,
    // require: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Productdb = mongoose.model("productdbs", productSchema);

module.exports = Productdb;

const mongoose = require("mongoose");

const schema = mongoose.Schema;

const hotalOwnerSchema = new schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  profilePicture: {
    type: String,
  },
  phoneNunber: {
    type: String,
    // require: true,
  },
  city: {
    type: String,
    // require: true,
  },
  password: {
    type: String,
    // require: true,
  },
  hotalsIDs: Array,
  token: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const HotalOwnerdb = mongoose.model("hotalOwnerdbs", hotalOwnerSchema);

module.exports = HotalOwnerdb;

const mongoose = require("mongoose");

const schema = mongoose.Schema;

const hotalsSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  contactNumber: {
    type: String,
    require: true,
  },
  profilePicture: {
    type: String,
  },
  city: {
    type: String,
  },
  coordinates: {
    type: Object,
  },
  categories: {
    type: Array,
  },
  about: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  timing: {
    type: String,
  },
  days: {
    type: Array,
  },
  gallery: {
    type: Array,
  },
  password: String,
  token: String,
  hotalOwnerID: String,
  specialItem: Object,
  twitter: String,
  facebook: String,
});

const Hotalsdb = mongoose.model("hotalsdbs", hotalsSchema);

module.exports = Hotalsdb;

const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    // required: true,
    type: String,
    // unique: true,
  },
  profilePicture: {
    type: String,
  },
  loginType: {
    type: String,
    // require: true,
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
  token: {
    type: String,
  },
  status: Number,
});

const Userdb = mongoose.model("userdbs", userSchema);

module.exports = Userdb;

const mongoose = require("mongoose");

const schema = mongoose.Schema;

const categorySchema = new schema({
  name: {
    type: String,
    required: true,
  },

  active: {
    type: Boolean,
    default: true,
  },
});

const Categorydb = mongoose.model("categorydbs", categorySchema);

module.exports = Categorydb;

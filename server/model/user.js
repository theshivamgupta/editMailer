const mongoose = require("mongoose");
const Template = require("./template");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  shopify_id: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    trim: true,
    required: true,
  },
  templates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Template,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);

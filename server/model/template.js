const mongoose = require("mongoose");
const sample = require("../sample.json");

const templateSchema = mongoose.Schema({
  htmlContent: {
    type: String,
    trim: true,
    default: JSON.stringify(sample),
  },
});

module.exports = mongoose.model("Template", templateSchema);

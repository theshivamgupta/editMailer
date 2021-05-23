const mongoose = require("mongoose");

const imagesSchema = mongoose.Schema({
  images: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model("Image", imageSchema);

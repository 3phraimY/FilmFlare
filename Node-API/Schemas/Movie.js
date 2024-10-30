const mongoose = require("mongoose");
const MovieSchema = new mongoose.Schema({
  IMDBid: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  UserRating: {
    type: Number,
    required: false,
  },
});
module.exports = mongoose.model("Movie", MovieSchema);

const mongoose = require("mongoose");
const UserDataSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  MyList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
  ],
  MyFavorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
  ],
  ToWatch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
  ],
  Friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Friend",
      required: true,
    },
  ],
});

UserDataSchema.set("collection", "UserData");
module.exports = mongoose.model("UserData", UserDataSchema);

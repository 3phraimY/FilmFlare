const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
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
    MoviePosterURL: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const FriendSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
    },
    Recommendations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
      },
    ],
  },
  { _id: false }
);

const UserDataSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    MyList: [MovieSchema],
    MyFavorites: [MovieSchema],
    ToWatch: [MovieSchema],
    Friends: [FriendSchema],
  },
  { versionKey: false }
);

UserDataSchema.set("collection", "UserData");
module.exports = mongoose.model("UserData", UserDataSchema);

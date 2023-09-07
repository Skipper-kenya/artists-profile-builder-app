import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  favorites: [
    { type: mongoose.Schema.Types.ObjectId, ref: "profiles",},
  ],
});

const userModel = mongoose.model("users", userSchema);

export default userModel;

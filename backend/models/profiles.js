import mongoose from "mongoose";

const profilesSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  sname: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const profileModel = mongoose.model("profiles", profilesSchema);
export default profileModel;

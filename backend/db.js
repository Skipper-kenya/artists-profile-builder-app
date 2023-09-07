import mongoose from "mongoose";

const connectDb = async (cb) => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://Skipper_ke:Andrew8286@artists-profile-builder.eeajqw3.mongodb.net/Artists_profile_builder?retryWrites=true&w=majority"
      )
      .then(() => {
        console.log("connected to the db");
        return cb();
      })
      .catch((err) => {
        return cb(err.message);
        console.log("error connectingto the db");
      });
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;

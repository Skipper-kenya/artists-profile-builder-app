import mongoose from "mongoose";

const connectDb = async (cb) => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("connected to the db");
        return cb();
      })
      .catch((err) => {
        return cb(err.message);
      });
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/usermodel.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, phone, dob } = req.body;

  try {
    const user = await userModel.findOne({ username });
    if (user) {
      return res.json({ message: "User already exists. proceed to login" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      password: hashPassword,
      phone,
      dob,
    });

    await newUser.save();
    return res.send({
      message: "user created. proceed to login",
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.send({ message: "user does not exist", condition: "no-user" });
    } else {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (err) {
          console.log("error comparing");
        } else {
          if (result) {
            const token = jwt.sign({ id: user._id }, "rasta-gang");
            return res.send({
              token,
              userId: user._id,
              user_name: user.username,
              message: "You're logged in.",
              action: "logged-in",
            });
          } else {
            return res.send({ message: "Password did not match." });
          }
        }
      });
    }

    //
  } catch (error) {
    console.log(error.message);
  }
});

export { router as UserRouter };

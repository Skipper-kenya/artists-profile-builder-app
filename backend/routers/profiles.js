import express from "express";

import profileModel from "../models/profiles.js";
import userModel from "../models/usermodel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newProfile = new profileModel(req.body);
    await newProfile.save();
    return res.send({ message: "Artist profile successfully created." });
  } catch (error) {
    console.log(`5THLAST ROUTE:${error.message}`);
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await profileModel.find({});

    return res.send(response);
  } catch (error) {
    console.log(`4THLAST ROUTE:${error.message}`);
  }
});

router.put("/", async (req, res) => {
  const { profileId, userId } = req.body;

  if (userId) {
    try {
      const user = await userModel.findById({ _id: userId });

      user.favorites.push(profileId);
      await user.save();
      res.send({
        message: "profile saved successfully.",
        updatedFavorites: user.favorites,
      });
    } catch (error) {
      console.log(`3RDLAST ROUTE:${error.message}`);
    }
  }
});

router.get("/ids/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userModel.findById({ _id: userId });

    res.send(user.favorites);
  } catch (error) {
    console.log(`2NDLAST ROUTE:${error.message}`);
  }
});

//route to get all data id's

router.get("/allIds/:id", async (req, res) => {
  const userId = req.params?.id;
  if (userId) {
    try {
      const user = await userModel.findById({ _id: userId });

      const userSaved = await profileModel.find({
        _id: { $in: user.favorites },
      });

      res.send(userSaved);
    } catch (error) {
      console.log(`LAST ROUTE:${error.message}`);
    }
  }
});

export { router as profilesRouter };

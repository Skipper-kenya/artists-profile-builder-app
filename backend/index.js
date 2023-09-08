import express from "express";
import cors from "cors";

import connectDb from "./db.js";
import { UserRouter } from "./routers/usersrouter.js";
import { profilesRouter } from "./routers/profiles.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", UserRouter);
app.use("/profiles", profilesRouter);

app.get("/trial", (req, res) => {
  res.json({ message: "HEY AMIGO YOU HAVE REACHED US " });
});

// 
connectDb(() => {
  app.listen(
    "https://artists-profile-builder-app.onrender.com",
    console.log(`server running at port specified`)
  );
});

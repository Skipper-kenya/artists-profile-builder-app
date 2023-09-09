import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import connectDb from "./db.js";
import { UserRouter } from "./routers/usersrouter.js";
import { profilesRouter } from "./routers/profiles.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", UserRouter);
app.use("/profiles", profilesRouter);

connectDb(() => {
  app.listen(
    process.env.port,
    console.log(`server running at port ${process.env.port}`)
  );
});

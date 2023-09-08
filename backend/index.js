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

const port = 5000;
connectDb(() => {
  app.listen(port, console.log(`server running at port ${port}`));
});

module.exports = app;

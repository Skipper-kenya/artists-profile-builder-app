import express from "express";

const router = express.Router();
router.get("/", (req, res) => {
  res.json({ message: "order received amigo" });
});

export { router as trialRouter };

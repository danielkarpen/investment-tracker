import db from "db";
import { Router } from "express";

const router = new Router();

// '/example/'
router.get("/", (_, res) => {
  res.send("<h1>Investments</h1>");
});

router.post("/", async (req, res) => {
  try {
    const results = await db.addThrowawayData(req.body);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

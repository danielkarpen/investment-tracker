import config from "config";
import db from "db";
import { Router } from "express";

const router = new Router();

// route for investments
router.get("/", (_, res) => {
  res.send("<h1>Investments</h1>");
});

router.post("/", async (req, res) => {
  try {
    if (req.body.email !== config.admin) {
      throw new Error("Unauthorized");
    }
    const results = await db.getAllInvestments(req.body.email);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

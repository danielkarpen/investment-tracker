import config from "config";
import db from "db";
import { Router } from "express";

const router = new Router();

// route for investments
router.get("/", (_, res) => {
  res.send("<h1>Investments</h1>");
});

router.post("/", async (req, res) => {
  console.log("got a request", req.body.email);
  try {
    if (req.body.email !== config.admin) {
      throw new Error("Unauthorized");
    }
    const results = await db.getAllInvestments();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/user", async (req, res) => {
  try {
    const results = await db.getUserInvestments(req.body.email);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/investment", async ({ body: { investment } } = {}, res) => {
  try {
    if (!investment) {
      res.status(400).json({ error: "Invalid investment name!" });
      return;
    }
    res.status(201).json(await db.addInvestment(investment));
  } catch (error) {
    if (error.name === "MongoError") {
      res.status(500).json({ error: error.message });
    }

    // Probably invalid data in the request
    res.status(400).json({ error: error.message });
  }
});

// router.delete("/user", async (req, res) => {
//   try {
//     const r;
//   }
// });

export default router;

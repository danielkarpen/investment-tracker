import { Router } from "express";

const router = new Router();

// '/example/'
router.get("/", (_, res) => {
  res.send("<h1>Investments</h1>");
});

router.post("/", (req, res) => {
  res.json(req.body);
});

export default router;

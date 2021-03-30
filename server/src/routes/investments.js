import config from "config";
import db from "db";
import { Router } from "express";

const router = new Router();

router.get(
  "/",
  /**
   * Example/base route
   * {Response} res - send back HTML
   */
  (_, res) => {
    res.send("<h1>Investments</h1>");
  }
);

// TODO{daniel.karpan}: Consider using ids instead of the name

// Get all investments in database ADMIN FEATURE
router.post("/", async (req, res) => {
  try {
    // TODO{daniel.karpan}: Use Firebase Auth SDK to verify JWT
    if (req.body.email !== config.admin) {
      throw new Error("Unauthorized");
    }
    const results = await db.getAllInvestments();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all user investments by users email address
router.post("/user", async (req, res) => {
  try {
    // TODO{daniel.karpan}: Improve this to validate ✉️.
    const results = await db.getUserInvestments(req.body.email);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post(
  "/investment",

  /**
   * Create an investment
   * @params {Request} req
   * @params {Object} req.body
   */
  async ({ body }, res) => {
    try {
      if (!body.investment) {
        res.status(400).json({ error: "Invalid investment name!" });
        return;
      }
      res.status(201).json(
        await db.addInvestment(
          // Send the entire JS object over as the payload to add
          body
        )
      );
    } catch (error) {
      /**
       * TODO{daniel.karpan}: Investigate various 'MongoErrors' to classify them with proper status codes.
       * Might want some type of `switch-case`
       */
      if (error.name === "MongoError") {
        res.status(500).json({ error: error.message });
      }

      // Probably invalid data in the request
      res.status(400).json({ error: error.message });
    }
  }
);

router.post(
  "/investor",

  /**
   * Add an investor to an investment
   * @params {Request} req
   * @params {Response} resp
   */
  async (req, res) => {
    try {
      // TODO{daniel.karpan}: Verify ID for proper adding...

      res
        .status(201)
        .json(
          await db.addPartnerToInvestment(req.body.investment, req.body.partner)
        );
    } catch (error) {
      throw new Error(error);
    }
  }
);

router.delete("/", async (req, res) => {
  try {
    // TODO{daniel.karpan}: Consider if only admin can delete...
    res.status(202).json(await db.deleteInvestment(req.body.investment));
  } catch (error) {
    if (error.name === "MongoError") {
      res.status(500).json({ error: error.message });
    }

    // Probably invalid data in the request
    res.status(400).json({ error: error.message });
  }
});

export default router;

import cors from "cors";
import express from "express";
import config from "./config";
import { investments } from "./routes";

const app = express();

app.get("/", (_, res) => {
  res.send("<h1>Hello Express!</h1>");
});

app.use(cors({ origin: "http://localhost:3000" }));

// Parse JSON as it comes in
app.use(express.json());

// Route any requests made with path '/example'...
app.use("/investments", investments);

app.listen(process.env.PORT, () => {
  console.info(`Express server 🏃🏾‍♂️ on port: ${config.port}`);
});

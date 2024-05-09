import chalk from "chalk";
import { config } from "dotenv";
import { authRoute } from "./src/routes/index.js";
import express, { json, urlencoded } from "express";
import { DBcon } from "./src/configuration/config.js";

DBcon();
config();

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
const port = process.env.PORT || 8010;

app.use("/auth", authRoute);
app.get("/", (_, res) => res.send("Admin Node app!"));

app.listen(port, () =>
  console.log(
    chalk.bgHex("#193547").hex("#ecf4f8")(
      "Admin Node app port",
      chalk.bgHex("#FFA500").hex("#000")(`http://localhost:${port}/`)
    )
  )
);

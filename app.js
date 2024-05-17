import chalk from "chalk";
import { config } from "dotenv";
import { authRoute, PackageRoute, settingRouter } from "./src/routes/index.js";
import express, { json, urlencoded } from "express";
import { DBcon } from "./src/configuration/config.js";
import cors from "cors";
import BP from "body-parser";

DBcon();
config();

const app = express();

app.use(json());
app.use(cors());
app.use(BP.json());
app.use(urlencoded({ extended: false }));
app.use(BP.json({ type: "application/*+json" }));
const port = process.env.PORT || 8010;

app.use("/auth", authRoute);
app.use("/product", PackageRoute);
app.use("/setting", settingRouter);
app.get("/", (_, res) => res.send("Admin Node app!"));

app.listen(port, () =>
  console.log(
    chalk.bgHex("#193547").hex("#ecf4f8")(
      "Admin Node app port",
      chalk.bgHex("#FFA500").hex("#000")(`http://localhost:${port}/`)
    )
  )
);

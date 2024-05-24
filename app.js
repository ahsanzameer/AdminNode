import cors from "cors";
import chalk from "chalk";
import BP from "body-parser";
import { config } from "dotenv";
import express, { json, urlencoded } from "express";
import { DBConnection } from "./src/configuration/config.js";

import {
  authRoute,
  storeRouter,
  PackageRoute,
  settingRouter,
} from "./src/routes/index.js";

config();
DBConnection();

const app = express();

app.use(json());
app.use(cors());
app.use(BP.json());
app.use(urlencoded({ extended: false }));
app.use(BP.json({ type: "application/*+json" }));
const port = process.env.PORT || 8010;

app.use("/auth", authRoute);
app.use("/store", storeRouter);
app.use("/product", PackageRoute);
app.use("/setting", settingRouter);
app.get("/", (_, res) => res.send("Admin Node app!"));

app.listen(port, () =>
  console.log(
    chalk.hex("#76ABAE")("𝙰𝚍𝚖𝚒𝚗 𝙽𝚘𝚍𝚎 𝚊𝚙𝚙 𝚙𝚘𝚛𝚝", `𝚑𝚝𝚝𝚙://𝚕𝚘𝚌𝚊𝚕𝚑𝚘𝚜𝚝:${port}/`)
  )
);

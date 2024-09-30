import chalk from "chalk";
import multer from "multer";
import { config } from "dotenv";
import { connect } from "mongoose";

config();
const { log } = console;

const URL = process.env.MONGO_URL;
export const fromData = multer().none();
export const DBConnection = async () => {
  try {
    await connect(URL);
    log(chalk.hex("#fff").italic(" MongoDB is connected successfully "));
  } catch (error) {
    log(
      chalk
        .hex("#ff52s52")
        .italic(`MongoDB error catch error: 💥💥💥� ${error}`)
    );
  }
};

export const catchErr = (data, a) => {
  return `Internal server error in ${data} API, ${a} controller`;
};

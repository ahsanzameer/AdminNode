import chalk from "chalk";
import { connect } from "mongoose";
import { config } from "dotenv";

config();
export const DBcon = async () => {
  try {
    await connect(process.env.MONGO_URL);
    console.log(chalk.hex("#DEADED").italic("MongoDB connected"));
  } catch (error) {
    authRoute;
    console.log(chalk.hex("#ff5252").italic(`MongoDB error: 💥💥💥� ${error}`));
  }
};

export const catchErr = (data, a) => {
  return `Internal server error ${data} API ${a} controller`;
};

import chalk from "chalk";
import multer from "multer";
import { config } from "dotenv";
import { connect } from "mongoose";

config();
export const DBcon = async () => {
  try {
    await connect(process.env.MONGO_URL);
    console.log(
      chalk.hex("#00C851").italic("ᴹᵒⁿᵍᵒᴰᴮ ⁱˢ ᶜᵒⁿⁿᵉᶜᵗᵉᵈ ˢᵘᶜᶜᵉˢˢᶠᵘˡˡʸ")
    );
  } catch (error) {
    console.log(chalk.hex("#ff5252").italic(`MongoDB error: 💥💥💥� ${error}`));
  }
};

export const catchErr = (data, a) => {
  return `Internal server error in ${data} API, ${a} controller`;
};

export const no_image = multer().none();

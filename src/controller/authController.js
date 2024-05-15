import asyncHandler from "express-async-handler";
import { compare, hash } from "bcrypt";
import { randomInt } from "crypto";
import { catchErr } from "../configuration/config.js";
import { User } from "../model/index.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!email || !password) {
      return res.status(200).json({
        status: 400,
        message: `${
          !email ? "email" : "password"
        } is missing in Login's parameters`,
      });
    } else if (!user) {
      return res.status(200).json({
        status: 400,
        message: "Your email is invalid",
      });
    } else {
      const checkPass = await User.findOne({ password });
      if (!checkPass) {
        return res.status(200).json({
          status: 400,
          message: "Your Password is invalid",
        });
      } else {
        return res.status(200).json({
          data: user,
          status: 200,
          message: "Login successful",
        });
      }
    }
  } catch (error) {
    return res
      .status(200)
      .json({ error, status: 500, message: catchErr("login", "auth") });
  }
});

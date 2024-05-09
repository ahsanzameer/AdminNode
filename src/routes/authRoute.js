import { Router } from "express";
import moment from "moment";
import multer from "multer";

import { login } from "../controller/authController.js";
const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resolve("./src/assets/images/"));
  },
  filename: (req, file, cb) => {
    let { fullName } = req.body;
    fullName = fullName.replace(/\s+/g, "");
    const ext = extname(file.originalname);
    const timestamp = moment().format("DD_MMM_YY--h-mm");
    const filename = `${timestamp}-${fullName}${ext}`;
    cb(null, filename);
  },
});

const no_upload = multer().none();
const upload_single = multer({ storage }).single("profile_image");

router.post("/login", no_upload, login);

export default router;

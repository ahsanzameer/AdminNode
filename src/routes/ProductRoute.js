import { Router } from "express";
const router = Router();

const no_upload = multer().none();

router.post("/login", no_upload, login);

export default router;

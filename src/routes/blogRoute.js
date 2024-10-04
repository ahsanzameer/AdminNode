import { Router } from "express";
import { 
  getBlog,
  editBlog,
  postBlog,
  deleteBlog,
  getAllBlog,
} from "../controller/blogController.js";
import { fromData } from "../configuration/config.js";
import upload from '../../middleware/multer.js';

const blogRoute = Router();

blogRoute.get("/getAllBlog", getAllBlog);
blogRoute.get("/getBlog/:blog_id", getBlog);
//blogRoute.post("/postBlog", fromData,upload.single('blogImage'), postBlog);
blogRoute.post("/postBlog",upload.single('blogImage'), postBlog);
blogRoute.delete("/deleteBlog/:delete_id", deleteBlog);
blogRoute.post("/editBlog/:edit_id", fromData, editBlog);

export default blogRoute;

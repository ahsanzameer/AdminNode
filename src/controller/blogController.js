import asyncHandler from "express-async-handler";
import { catchErr } from "../configuration/config.js";
import { Blogs, User } from "../model/index.js";

export const postBlog = asyncHandler(async (req, res) => {
  const { blogTitle, blogDescription, blogImage, uploaderID } = req.body;
  try {
    if (!blogTitle || !blogDescription || !blogImage || !uploaderID) {
      res.status(200).json({
        status: 400,
        message: `${
          !blogTitle
            ? "title"
            : !blogDescription
            ? "description"
            : !blogImage
            ? "image"
            : !uploaderID
            ? "uploaderID"
            : ""
        } is required`,
      });
    }

    const chectitle = await Blogs.findOne({ blogTitle });
    const checUser = await User.findOne({ _id: uploaderID });
    if (!checUser) {
      return res.status(200).json({
        status: 400,
        message: `This User Not Found`,
      });
    }

    if (chectitle) {
      return res.status(200).json({
        status: 400,
        message: `This Blog ${chectitle ? "Title" : ""} already exists`,
      });
    }
    const newBlog = await Blogs.create({
      blogTitle,
      blogDescription,
      blogImage,
      uploaderID,
    });
    res
      .status(200)
      .json({ status: 200, data: newBlog, message: "Blog Posted" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      status: 500,
      error: error.message,
      message: catchErr("post Blog", "blog"),
    });
  }
});

export const getAllBlog = asyncHandler(async (_, res) => {
  try {
    const data = await Blogs.find().populate({
      path: "uploaderID",
      select: "userName email",
    });

    return res.status(200).json({
      data,
      status: 200,
      message: "Found the Data",
    });
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("get Blog", "blog Controller"),
    });
  }
});

export const getBlog = asyncHandler(async (req, res) => {
  const { blog_id } = req.params;
  try {
    const data = await Blogs.findById(blog_id).populate({
      path: "uploaderID",
      select: "userName email",
    });
    return res.status(200).json({
      data,
      status: 200,
      message: "Found the Data",
    });
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("get Blog", "blog Controller"),
    });
  }
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const { delete_id } = req.params;
  const data = await Blogs.findByIdAndDelete(delete_id);
  try {
    if (!data) {
      return res
        .status(200)
        .json({ status: 400, message: "Can not found this Blog" });
    } else {
      return res.status(200).json({
        data,
        status: 200,
        message: "Successfuly deleted",
      });
    }
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("deleteBlog", "blog"),
    });
  }
});

export const editBlog = asyncHandler(async (req, res) => {
  const { edit_id } = req.params;
  const { blogTitle, blogDescription, blogImage } = req.body;
  try {
    if (!blogTitle || !blogDescription || !blogImage) {
      res.status(200).json({
        status: 400,
        message: `${
          !blogTitle
            ? "title"
            : !blogDescription
            ? "description"
            : !blogImage
            ? "image"
            : ""
        } is required`,
      });
    }

    const chectitle = await Blogs.findOne({ blogTitle });
    if (chectitle) {
      return res.status(200).json({
        status: 400,
        message: `This Blog ${chectitle ? "Title" : ""} already exists`,
      });
    }
    const data = await Blogs.findByIdAndUpdate(
      edit_id,
      { blogTitle, blogDescription, blogImage },
      { new: true }
    );
    if (!data) {
      return res
        .status(200)
        .json({ status: 400, message: "Can not found this Blog" });
    } else {
      return res.status(200).json({
        data,
        status: 200,
        message: "Successfuly Updated",
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("editBlog", "blog"),
    });
  }
});

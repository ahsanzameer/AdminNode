import DefaultLayout from "@/layout/DefaultLayout";
import React, { useState } from "react";
import { usePostBlogMutation as useAdd } from "../../redux/actions/blogAction";
import toast from "react-hot-toast";
import { catchErr } from "@/utils/urls";
import { useSelector } from "react-redux";

const CreateBlogs = () => {
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    blogTitle: "", // Match the backend model
    blogDescription: "", // Match the backend model
    blogImage: null,
    uploaderID: user._id,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [AddBlogApi, { isLoading }] = useAdd();

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      blogImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogTitle = formData.blogTitle;
    const blogDescription = formData.blogDescription;
    const blogImage =
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const uploaderID = user._id;
    try {
      const response = await AddBlogApi({
        blogTitle,
        blogDescription,
        blogImage,
        uploaderID,
      });
      const { status, message } = response.data;

      console.log("message", message);
      if (status === 200) {
        toast.success(message, { duration: 3000 });
      } else if (status === 400) {
        toast.error(message, { duration: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.error(catchErr, { duration: 3000 });
    }
  };

  return (
    <div className="w-full">
      <DefaultLayout>
        <div className="max-w-4xl mx-auto mt-10 px-4">
          <h1 className="text-4xl font-bold text-center mb-6">
            Add a New Blog
          </h1>
          <form
            onSubmit={handleSubmit}
            className=" dark:bg-black bg-white p-8 rounded-lg shadow-lg"
          >
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="blogTitle"
              >
                Blog Title
              </label>
              <input
                type="text"
                id="blogTitle"
                name="blogTitle" // Matches the key in the backend
                value={formData.blogTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter blog title"
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="blogDescription"
              >
                Blog Description
              </label>
              <textarea
                id="blogDescription"
                name="blogDescription" // Matches the key in the backend
                value={formData.blogDescription}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter blog description"
                rows="5"
                required
              />
            </div>

            <div className="mb-6">
              <label
                className=" block text-gray-700 text-sm font-bold mb-2"
                htmlFor="blogImage"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="blogImage"
                name="blogImage"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                {isLoading ? "Uploading..." : "Add Blog"}
              </button>
            </div>
          </form>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default CreateBlogs;

import React, { useLayoutEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import toast from "react-hot-toast";
import { BoxStyle } from "./EditSettingModal";
import { useEditBlogApiMutation } from "@/redux/actions/blogAction";

const EditBlogModal = ({ data, open, onClose, handleGetData }) => {
  console.log("data", data);
  const [value, setValue] = useState({
    blogTitle: data?.blogTitle,
    blogDescription: data?.blogDescription,
    blogImage: data?.blogImage,
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  useLayoutEffect(() => {
    setValue({
      blogTitle: data?.blogTitle,
      blogDescription: data?.blogDescription,
      blogImage: data?.blogImage,
    });
  }, [data]);
  const [editSettingApi, { isLoading }] = useEditBlogApiMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ overflow: "auto" }}
    >
      <Box
        sx={BoxStyle}
        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      >
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Edit Blog
            </h3>
          </div>

      {/* mm change starts */}
      <div className="p-6.5">
    {/* Title Field */}
    <div className="mb-4">
      <label className="block text-black dark:text-white font-medium mb-2" htmlFor="title">
      
      </label>
      <input
        id="title"
        type="text"
        className="w-full p-3 border border-stroke rounded-md dark:border-strokedark dark:bg-boxdark dark:text-white"
        value={value.blogTitle} 
        onChange={handleChange}
      />
    </div>

    {/* Description Field */}
    <div className="mb-4">
      <label className="block text-black dark:text-white font-medium mb-2" htmlFor="description">
        Description
      </label>
      <textarea
        id="description"
        className="w-full p-3 border border-stroke rounded-md dark:border-strokedark dark:bg-boxdark dark:text-white"
        rows="5"
        value={value.blogDescription}
        onChange={handleChange}
      ></textarea>
    </div>

    {/* Image Upload Field */}
    <div className="mb-4">
      <label className="block text-black dark:text-white font-medium mb-2" htmlFor="image">
        Image
      </label>
      <input
        id="image"
        type="file"
        className="w-full p-3 border border-stroke rounded-md dark:border-strokedark dark:bg-boxdark dark:text-white"
        accept="image/*"
      />
    </div>

    <div className="mb-4">
      <img
        src={value.blogImage}
        alt="Blog preview"
        
         className="w-1/2 h-50 object-cover rounded-md"
      />
    </div>



    {/* Save Button */}
    <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200">
      Save Changes
    </button>
  </div>
  {/* mmchangeEnds */}

        </div>
      </Box>
    </Modal>
  );
};

export default EditBlogModal;

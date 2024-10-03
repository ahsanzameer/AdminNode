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
        </div>
      </Box>
    </Modal>
  );
};

export default EditBlogModal;

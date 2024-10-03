import React from "react";
import { Modal, Box } from "@mui/material";
import { BoxStyle } from "./EditSettingModal";

const ViewBlogModal = ({ data, open, onClose }) => {
  console.log({ data });
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={BoxStyle}
        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      >
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4">
          <div className="bg-white p-8 sm:p-10 rounded-lg shadow-lg max-w-lg w-full h-auto overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-200"
              onClick={onClose}
            >
              Close
            </button>

            <>
              <img
                src={data?.imageUrl}
                alt="Blog post"
                className="w-full h-48 sm:h-64 object-cover mb-4 rounded-lg shadow-sm"
              />
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
                {data?.title}
              </h2>
              <p className="text-gray-600 mb-4">{data?.content}</p>
            </>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ViewBlogModal;

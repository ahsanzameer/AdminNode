import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import moment from "moment/moment";
import { style as ModalStyle } from "./ViewPackageModal";
import { baseUrl } from "@/utils/urls";
import { useGetSingleStoreProductApiMutation as useGetProduct } from "@/redux/actions/storeAction";
import toast from "react-hot-toast";
import { Loader } from "..";

const ProductDetailModal = ({ visible, id, onClose }) => {
  const [data, setData] = useState({});
  console.log({ data });

  const [getProduct, { isLoading }] = useGetProduct();
  const handleGetProductDetail = async () => {
    try {
      const response = await getProduct(id);
      const { status, message, data: getData } = await response.data;
      if (status === 200) {
        setData(getData);
        console.log("yhh raha data bharway");
      } else {
        toast.error(message, { duration: 3000 });
      }
    } catch (error) {
      toast.error(error.message, { duration: 3000 });
    }
  };

  useEffect(() => {
    if (visible) {
      handleGetProductDetail();
    }
  }, [id]);

  return (
    <Modal
      open={visible}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          sx={ModalStyle}
          className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <img
            src="https://images.unsplash.com/photo-1658908579571-74f0e7cd8fbd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="hello"
          />
        </Box>
      )}
    </Modal>
  );
};

export default ProductDetailModal;

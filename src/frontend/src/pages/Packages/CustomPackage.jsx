import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import { Loader } from "../../components";

import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Box, Modal, Typography, Button, TextField } from "@mui/material";
import toast from "react-hot-toast";
import {
  useChangeStatusPackageMutation,
  useGetCustomPackageMutation,
} from "../../redux/actions/userAction";

function ListPackage() {
  const [getCustomKaData, setGetCustomKaData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [customprice,setCustomprice]=useState("")

  const handleOpenModal = (packageId) => {
    setSelectedPackageId(packageId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPackageId(null);
    setModalOpen(false);
  };

  const [changeStatusApi] = useChangeStatusPackageMutation();
  const handleConfirm = async () => {
    try {
      if (!customprice) {
        toast.error('Price is Required')
      }else{
        const item = { id: selectedPackageId, status: true };
        const response = await changeStatusApi(item);
        console.log("response", response);
        const { status, message } = response.data;
        if (status === 200) {
          toast.success(message, { duration: 3000 });
          handleCloseModal();
          handleGetCustomPackage();
        } else if (status === 400) {
          toast.error(message, { duration: 3000 });
        }
      }
     
    } catch (error) {
      toast.error(error, { duration: 3000 });
    }
  };

  const [GetCustomPackageApi, { isLoading }] = useGetCustomPackageMutation();
  const handleGetCustomPackage = async () => {
    try {
      const response = await GetCustomPackageApi();
      const { status, message, object } = response.data;
      if (status === 200) {
        setGetCustomKaData(object);
      } else if (status === 400) {
        toast.error(message, { duration: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.error(error, { duration: 3000 });
    }
  };

  useEffect(() => {
    handleGetCustomPackage();
  }, []);

  return (
    <div className="w-full">
      <DefaultLayout>
        <TableContainer
          component={Paper}
          className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="text-title-md font-bold text-black dark:text-white">
                  Store Id
                </TableCell>
                <TableCell
                  className="text-title-md font-bold text-black dark:text-white"
                  align="center"
                >
                  Amazon Product
                </TableCell>
                <TableCell
                  className="text-title-md font-bold text-black dark:text-white"
                  align="center"
                >
                  Csv Products
                </TableCell>
                <TableCell
                  className="text-title-md font-bold text-black dark:text-white"
                  align="center"
                >
                  Email
                </TableCell>
                <TableCell
                  className="text-title-md font-bold text-black dark:text-white"
                  align="center"
                >
                  Message
                </TableCell>
                <TableCell
                  className="text-title-md font-bold text-black dark:text-white"
                  align="center"
                >
                  Status
                </TableCell>
                <TableCell
                  className="text-title-md font-bold text-black dark:text-white"
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            {isLoading ? (
              <Loader />
            ) : (
              <TableBody>
                {getCustomKaData.map((elem, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        className="text-title-md font-bold text-black dark:text-white"
                        component="th"
                        scope="row"
                        style={{
                          maxWidth: "100px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {elem.store_id}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="text-title-md font-bold text-black dark:text-white"
                      >
                        {elem.amazonProduct}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="text-title-md font-bold text-black dark:text-white"
                      >
                        {elem.csvProduct}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="text-title-md font-bold text-black dark:text-white"
                      >
                        {elem.email}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="text-title-md font-bold text-black dark:text-white"
                      >
                        {elem.message}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="text-title-md font-bold text-black dark:text-white"
                      >
                        {elem.status ? "Active" : "Inactive"}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="text-title-md font-bold text-black dark:text-white"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Link onClick={() => handleOpenModal(elem._id)}>
                          <PiDotsThreeOutlineVerticalFill
                            style={{ fontSize: 20 }}
                          />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
          <Modal open={modalOpen} onClose={handleCloseModal}>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
    }}
  >
    <Typography variant="h6" component="h2">
      Are you sure to add the package?
    </Typography>
    <Box
      component="form"
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        label="Enter Amount"
        variant="outlined"
        type="number"
        value={customprice}
        onChange={(e) => setCustomprice(e.target.value)}
        fullWidth
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Button variant="contained" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleConfirm} color="primary">
          Confirm
        </Button>
      </Box>
    </Box>
  </Box>
</Modal>


        </TableContainer>
      </DefaultLayout>
    </div>
  );
}

export default ListPackage;

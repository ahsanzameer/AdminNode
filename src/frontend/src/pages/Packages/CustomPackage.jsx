import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import React, { useEffect, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TableContainer from "@mui/material/TableContainer";
import DialogContentText from "@mui/material/DialogContentText";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

import ViewPackageModal from "../../components/Modals/ViewPackageModal";
import EditPackageModal from "../../components/Modals/EditPackageModal";
import toast from "react-hot-toast";
import { useGetCustomPackageMutation } from "../../redux/actions/userAction";

function ListPackage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [data, setData] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [open3, setOpen3] = useState(false);
  const handleClose3 = () => setOpen3(false);
  const [getCustomKaData, setGetCustomKaData] = useState([]);
  const [open4, setOpen4] = useState(false);
  const handleClose4 = () => setOpen4(false);

  const handleClick = (event, rowData) => {
    setAnchorEl(event.currentTarget);
    setData(rowData);
  };
  const handleClose = (type, emnt) => {
    if (type === "edit") {
      setOpen4(true);
      // navigate("/editpackage");
    } else if (type === "delete") {
      setDeleteModal(true);
    } else if (type === "detail") {
      setOpen3(true);
    }
    setAnchorEl(null);
  };

  const [GetCustomPackageApi] = useGetCustomPackageMutation();
  const onGetCustomPackage = async () => {
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
    setDeleteModal(false);
  };

  useEffect(() => {
    onGetCustomPackage();
  }, []);
  console.log("getCustomKaData", getCustomKaData);
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
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              { getCustomKaData.map((elem,index)=>{
                return(
                  <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
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
                   {console.log(elem.store_id)}
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
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Link
                      id="fade-button"
                      aria-controls={open ? "fade-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(event) => handleClick(event, row)}
                      // onClick={() => (handleClick(), setData(row))}
                    >
                      <PiDotsThreeOutlineVerticalFill style={{ fontSize: 20 }} />
                    </Link>
                  </TableCell>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={() => handleClose("edit", row)}>
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => handleClose("detail", row)}>
                      View details
                    </MenuItem>
                    <MenuItem onClick={() => handleClose("delete", row)}>
                      Delete
                    </MenuItem>
                  </Menu>
                </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <ViewPackageModal data={data} open={open3} onClose={handleClose3} />
        <EditPackageModal
          data={data}
          open={open4}
          onClose={handleClose4}
          // handleGetData={handleGetData}
        />
      </DefaultLayout>
    </div>
  );
}

export default ListPackage;

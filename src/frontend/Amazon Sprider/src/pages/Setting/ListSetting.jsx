import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import ViewPackageModal from "../../components/Modals/ViewPackageModal";
import EditSettingModal from "../../components/Modals/EditSettingModal";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function ListSetting() {
  const [open3, setOpen3] = useState(false);
  const handleClose3 = () => setOpen3(false);
  const [data, setData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);

  const onDissmissDeleteModal = () => {
    setDeleteModal(false);
  };

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
                  URL
                </TableCell>
                <TableCell
                  className="text-title-md font-bold text-black dark:text-white"
                  align="center"
                >
                  Name
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
              {DATA.map((row, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      className="text-title-md font-bold text-black dark:text-white"
                      component="th"
                      scope="row"
                      style={{
                        maxWidth: "150px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {row?.key_value}
                    </TableCell>
                    <TableCell
                      align="center"
                      
                      className="text-title-md font-bold text-black dark:text-white"
                    >
                      {row?.key_name}
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
                      <div className="flex flex-row justify-end p-4 space-x-2 sm:w-1/5" style={{ alignItems: 'center' }}>
                        <button
                          onClick={() => {
                            setOpen3(true);
                            setData(row);
                          }}
                          className="h-9 flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeleteModal(true);
                            setData(row);
                          }}
                          className="h-9 flex justify-center rounded bg-danger py-1.5 px-4 font-medium text-white hover:bg-opacity-90"
                        >
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
          <Breadcrumb pageName="List Settings" show />

          {DATA.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row h-auto sm:h-30 w-full mb-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
            >
              <div className="flex flex-col justify-center p-4 sm:w-4/5">
                <label className="mb-2.5 block text-black dark:text-white font-extrabold">
                  {item.key_name}
                </label>
                <label className="mb-2.5 block text-black dark:text-white">
                  {item.key_value}
                </label>
              </div>
              <div className="flex flex-row justify-end p-4 space-x-2 sm:w-1/5" style={{ alignItems: 'center' }}>
                <button
                  onClick={() => {
                    setOpen3(true);
                    setData(item);
                  }}
                  className="h-9 flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteModal(true);
                    setData(item);
                  }}
                  className="h-9 flex justify-center rounded bg-danger py-1.5 px-4 font-medium text-white hover:bg-opacity-90"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div> */}
      </DefaultLayout>



      <EditSettingModal open={open3} onClose={handleClose3} data={data} />
      <Dialog
        open={deleteModal}
        onClose={onDissmissDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="dark:bg-boxdark-2 dark:text-bodydark"
        >
          {"Delete Field"}
        </DialogTitle>
        <DialogContent className="dark:bg-boxdark-2 dark:text-bodydark">
          <DialogContentText
            id="alert-dialog-description"
            className="dark:bg-boxdark-2 dark:text-bodydark"
          >
            Are you sure you want to delete this field?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dark:bg-boxdark-2 dark:text-bodydark">
          <Button >Yes</Button>
          <Button onClick={onDissmissDeleteModal} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ListSetting;

const DATA = [
  {
    key_name: "google_url",
    key_value: "https://www.google.com/",
  },
  {
    key_name: "facebook_url",
    key_value: "https://www.facebook.com/",
  },
];

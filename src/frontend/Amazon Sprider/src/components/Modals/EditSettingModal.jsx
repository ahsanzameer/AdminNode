import React, { useLayoutEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import SelectGroupOne from "../Forms/SelectGroup/SelectGroupOne";
import { useEditPackageMutation } from "../../redux/actions/userAction";
import toast from "react-hot-toast";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%", // Adjusted to be responsive
    maxWidth: "500px", // Added to limit maximum width
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    overflow: "auto",
    maxHeight: "95%",
};

function EditSettingModal(props) {
    const { data, open, onClose } = props;

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflow: "auto" }}
        >
            <Box
                sx={style}
                className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
            >
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Edit field
                        </h3>
                    </div>

                    <form action="#" >
                        <div className="p-6.5">

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Key
                                </label>
                                <input
                                disabled={data?.isDefault == 1? true : false}
                                    defaultValue={data?.key_name}
                                    //   value={value.packageAmazonImportNumber}
                                    name="key"
                                    //   onChange={handleChange}
                                    type="text"
                                    placeholder="Edit your key"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Value
                                </label>
                                <input
                                    defaultValue={data?.key_value}
                                    //   value={value.packageAmazonImportNumber}
                                    name="value"
                                    //   onChange={handleChange}
                                    type="text"
                                    placeholder="Edit your value"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <button 
                            onClick={onClose}
                            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Confirm
                            </button>

                        </div>
                    </form>
                </div>
            </Box>
        </Modal>
    )
}

export default EditSettingModal
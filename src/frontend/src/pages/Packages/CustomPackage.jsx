import React from "react";
import DefaultLayout from "@/layout/DefaultLayout";
import { TableContainer } from "@mui/material";
import Paper from "@mui/material/Paper";

const CustomPackage = () => {
  return (
    <div className="w-full">
      <DefaultLayout>
        <TableContainer
          component={Paper}
          className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
        ></TableContainer>
      </DefaultLayout>
    </div>
  );
};

export default CustomPackage;

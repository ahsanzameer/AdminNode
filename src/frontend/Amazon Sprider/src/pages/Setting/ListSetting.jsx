import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import userThree from "../../images/user/user-03.png";

function ListSetting() {
  return (
    <div className="w-full">
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="List Settings" />

        <div className="grid grid-cols-5 gap-8">
    
        </div>
      </div>
    </DefaultLayout>
  </div>
  )
}

export default ListSetting
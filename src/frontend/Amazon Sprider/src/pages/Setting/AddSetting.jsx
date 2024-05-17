import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import userThree from "../../images/user/user-03.png";
import slugify from 'react-slugify';

function AddSetting() {
  const [fieldData, setFieldData] = useState([
    {
      key_name: '',
      key_value: ''
    }
  ]);

  const handleAddField = (e) => {
    e.preventDefault();
    setFieldData((prev) => [
      ...prev,
      {
        key_name: '',
        key_value: ''
      },
    ]);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setFieldData((prev) => prev.slice(0, -1));
  };
  const handleInput = (e, indx) => {
    const { name, value } = e.target;
    setFieldData((prev) =>
      prev.map((item, index) =>
        index === indx ? { ...item, [name]: value } : item
      )
    );
  };
  const handleBlur = (e, indx) => {
    const { name, value } = e.target;
    const slugifiedValue = name === 'key_name' ? slugify(value, { delimiter: '_' }) : value;
    setFieldData((prev) =>
      prev.map((item, index) =>
        index === indx ? { ...item, [name]: slugifiedValue } : item
      )
    );
  };


  return (
    <div className="w-full">
      <DefaultLayout>
        <div className="mx-auto max-w-270">
          {/* <Breadcrumb pageName="Add Setting" show /> */}
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Add Setting
                </h3>
              </div>
              <div className="p-7">
                <form action="#">

                  {fieldData.map((item, indx) => (
                    <div key={indx} className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor={`keyName-${indx}`}
                        >
                          Key Name
                        </label>
                        <div className="relative">
                          <input
                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="key_name"
                            id={`keyName-${indx}`}
                            placeholder="Enter your key"
                            value={item.key_name}
                            onChange={(e) => handleInput(e, indx)}
                            onBlur={(e) => handleBlur(e, indx)}
                          />
                        </div>
                      </div>

                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor={`keyValue-${indx}`}
                        >
                          Key Value
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="key_value"
                          id={`keyValue-${indx}`}
                          placeholder="Enter your value"
                          value={item.key_value}
                          onChange={(e) => handleInput(e, indx)}
                        />
                      </div>
                    </div>
                  ))}
           


                  <div className="flex justify-end gap-4.5">
                    {
                      fieldData?.length > 1 &&
                      <button
                        onClick={handleCancel}
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      // type="submit"
                      >
                        Cancel
                      </button>
                    }
                    <button
                      onClick={handleAddField}
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Add field
                    </button>
                  </div>

                  <button
                    className="mt-5.5 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </div>
  )
}

export default AddSetting
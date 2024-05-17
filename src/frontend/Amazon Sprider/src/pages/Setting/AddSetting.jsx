import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import userThree from "../../images/user/user-03.png";


function AddSetting() {

  const [fieldData, setFieldData] = useState([{
    id: 1,
    key_name: '',
    key_value: ''
  }])

  console.log('fieldData', fieldData)

  const handleAddField = (e) => {
    e.preventDefault();
    setFieldData((prev) => [
      ...prev,
      {
        id: fieldData.length + 1,
        key_name: '',
        key_value: ''
      },
    ]);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    const filterData = fieldData.filter((item, indx) => indx + 1 != fieldData.length)
    setFieldData(filterData)
  }
  const handleInput = (e) => {
  }

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

                  {
                    fieldData.map((item, indx) => {
                      return (
                        <div key={indx} className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                              Key Name
                            </label>
                            <div className="relative">
                              <input
                                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="key"
                                id="fullName"
                                placeholder="Enter your key name"
                                defaultValue={item.key_name}
                                onChange={handleInput}
                              />
                            </div>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="phoneNumber"
                            >
                              Key Value
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="text"
                              name="value"
                              id="phoneNumber"
                              placeholder="Enter your key value"
                              defaultValue={item.key_value}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                      )
                    })
                  }



                  <div className="flex justify-end gap-4.5">
                    <button
                      onClick={handleCancel}
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    // type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddField}
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Add
                    </button>
                  </div>


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
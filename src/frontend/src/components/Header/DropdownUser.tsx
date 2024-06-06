import React from "react";
import UserOne from "../../images/user/user-01.png";
import { useSelector } from "react-redux";

const DropdownUser = () => {
  const user = useSelector((state) => state.auth.user);
 
  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
          {user.userName}
          </span>
          {/* <span className="block text-xs">React Developer</span> */}
        </span>

        {/* <span className="h-12 w-12 rounded-full">
          <img src={UserOne} alt="User" />
        </span> */}
      </div>
    </div>
  );
};

export default DropdownUser;

import moment from "moment";
import React from "react";

const BlogCard = ({ data, onRead, onDelete, onEdit }) => {
  return (
    <div className="dark:bg-graydark bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={data.blogImage}
        alt="Blog post"
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <p className="dark:text-white text-black text-gray-500 text-sm truncate font-bold">
            User: {data.uploaderID.userName}
          </p>

          <p className="dark:text-white text-black text-gray-500 text-sm truncate font-bold">
            Date: {moment(data.createdAt).format("Do MMM YYYY")}
          </p>
        </div>
        <p className="dark:text-white text-black text-gray-500 text-sm mb-4 truncate font-bold">
          Email: {data.uploaderID.email}
        </p>

        <h3 className="dark:text-white text-black text-lg font-semibold mb-2">
          {data.blogTitle}
        </h3>
        <p className="dark:text-white text-black text-gray-500 text-sm mb-4 truncate">
          {data.blogDescription}
        </p>
        <span
          className="mt-2 inline-block bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-xs mr-2 cursor-pointer"
          onClick={onRead}
        >
          Read Article
        </span>
        <span
          className="mt-2 inline-block bg-green-100 text-green-500 px-3 py-1 rounded-full text-xs mr-2 cursor-pointer"
          onClick={onEdit}
        >
          Edit
        </span>
        <span
          className="mt-2 inline-block bg-red-100 text-red-500 px-3 py-1 rounded-full text-xs cursor-pointer"
          onClick={onDelete}
        >
          Delete
        </span>
      </div>
    </div>
  );
};

export default BlogCard;

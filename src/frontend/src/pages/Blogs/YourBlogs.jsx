import { Loader } from "@/components";
import BlogCard from "@/components/Cards/BlogCard";
import DeleteModal from "@/components/Modals/DeleteModal";
import EditBlogModal from "@/components/Modals/EditBlogModal";
import ViewBlogModal from "@/components/Modals/ViewBlogModal";
import DefaultLayout from "@/layout/DefaultLayout";
import {
  useGetBlogMutation as useGet,
  useDeleteBlogApiMutation as useDelete,
} from "@/redux/actions/blogAction";
import { setBlogData } from "@/redux/slices/getBlogSlice";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const YourBlogs = () => {
  const dispatch = useDispatch();
  const blogData = useSelector((state) => state.getBlogData.value);

  const [isModalOpen, setIsModalOpen] = useState({
    visible: false,
    data: null,
  });
  const [isReadModal, setIsReadModal] = useState({
    visible: false,
    data: null,
  });
  const [isDeleteModal, setIsDeleteModal] = useState({
    visible: false,
    id: null,
  });

  const [getBlogApi, { isLoading }] = useGet();
  const handleGetBlogApi = async () => {
    try {
      const response = await getBlogApi();
      const { status, message, data } = response.data;
      if (status === 200) {
        dispatch(setBlogData(data));
      } else if (message) {
        toast.error(message, { duration: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.error(error, { duration: 3000 });
    }
  };

  const [deleteBlog] = useDelete();

  const onDelete = async () => {
    try {
      const delete_id = isDeleteModal.id;
      const response = await deleteBlog(delete_id);
      const { status, message } = response.data;
      if (status === 200) {
        handleGetBlogApi();
        toast.success(message, { duration: 3000 });
      } else if (status === 400) {
        toast.error(message, { duration: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.error(error, { duration: 3000 });
    }
    setTimeout(() => {
      setIsDeleteModal({ visible: false, id: null });
    }, 500);
  };

  useEffect(() => {
    handleGetBlogApi();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full">
      <DefaultLayout>
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center my-4">
              Browse by Category
            </h1>

            {/* Blog Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogData?.map((blog, index) => (
                <BlogCard
                  data={blog}
                  key={index}
                  onEdit={() => setIsModalOpen({ visible: true, data: blog })}
                  onDelete={() =>
                    setIsDeleteModal({ visible: true, id: blog._id })
                  }
                  onRead={() => setIsReadModal({ visible: true, data: blog })}
                />
              ))}
            </div>
          </div>
          <EditBlogModal
            data={isModalOpen.data}
            open={isModalOpen.visible}
            onClose={() => setIsModalOpen({ visible: false, data: null })}
          />
          <DeleteModal
            onYes={onDelete}
            title={"Delete Blog"}
            open={isDeleteModal.visible}
            SubTitle={"Are you sure to delete this Blog"}
            onclose={() => setIsDeleteModal({ visible: false, id: null })}
          />
          <ViewBlogModal
            data={isReadModal.data}
            open={isReadModal.visible}
            onClose={() => setIsReadModal({ visible: false, data: null })}
          />
        </>
      </DefaultLayout>
    </div>
  );
};

export default YourBlogs;

import { Loader } from "@/components";
import BlogCard from "@/components/Cards/BlogCard";
import DeleteModal from "@/components/Modals/DeleteModal";
import EditBlogModal from "@/components/Modals/EditBlogModal";
import DefaultLayout from "@/layout/DefaultLayout";
import { useGetBlogMutation } from "@/redux/actions/blogAction";
import { setBlogData } from "@/redux/slices/getBlogSlice";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const YourBlogs = () => {
  const dispatch = useDispatch();
  const blogData = useSelector((state) => state.getBlogData.value);
  console.log(blogData);
  const [isModalOpen, setIsModalOpen] = useState({
    visible: false,
    data: null,
  });
  const [isDeleteModal, setIsDeleteModal] = useState({
    visible: false,
    id: null,
  });
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [modalType, setModalType] = useState(""); // To determine whether the modal is for 'view', 'edit', or 'delete'

  const openModal = (blog, type) => {
    setSelectedBlog(blog);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen({ visible: false, data: null });
  };

  const onDelete = () => {
    setIsDeleteModal({ visible: false, id: null });
    toast.success("Blog deleted successfully");
  };

  const [getBlogApi, { isLoading }] = useGetBlogMutation();
  const handleGetBlogApi = async () => {
    try {
      const response = await getBlogApi();
      console.log(response);
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
                />
              ))}
            </div>
          </div>
          <EditBlogModal
            open={isModalOpen.visible}
            data={isModalOpen.data}
            onClose={() => setIsModalOpen({ visible: false, data: null })}
          />
          <DeleteModal
            onclose={() => setIsDeleteModal({ visible: false, id: null })}
            SubTitle={"Are you sure to delete this Blog"}
            onYes={onDelete}
            open={isDeleteModal.visible}
            title={"Delete Blog"}
          />
          {/* Modal */}
          {isModalOpen && selectedBlog && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4">
              <div className="bg-white p-8 sm:p-10 rounded-lg shadow-lg max-w-lg w-full h-auto overflow-y-auto relative">
                <button
                  className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-200"
                  onClick={closeModal}
                >
                  Close
                </button>

                {modalType === "view" && (
                  <>
                    <img
                      src={selectedBlog.imageUrl}
                      alt="Blog post"
                      className="w-full h-48 sm:h-64 object-cover mb-4 rounded-lg shadow-sm"
                    />
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
                      {selectedBlog.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{selectedBlog.content}</p>
                  </>
                )}

                {/* {modalType === "edit" && (
                  <>
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
                      Edit Blog: {selectedBlog.title}
                    </h2>
                    <textarea
                      className="w-full h-40 sm:h-64 p-4 border border-gray-300 rounded-md mb-4"
                      placeholder="Edit your blog content here..."
                    >
                      {selectedBlog.content}
                    </textarea>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200">
                      Save Changes
                    </button>
                  </>
                )} */}
              </div>
            </div>
          )}
        </>
      </DefaultLayout>
    </div>
  );
};

export default YourBlogs;

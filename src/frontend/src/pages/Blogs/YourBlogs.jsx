import DefaultLayout from "@/layout/DefaultLayout";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { useState } from 'react';

const YourBlogs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [modalType, setModalType] = useState(''); // To determine whether the modal is for 'view', 'edit', or 'delete'

  const blogs = [
    {
      title: 'Stylish Kitchen And Dining Room With Functional Ideas',
      content: 'Lorem Ipsum is simply dummy text of the print and typesetting industry...',
      imageUrl: 'https://via.placeholder.com/300x200',
      username: 'mmk',
      email: 'mm@gmail.com',
      date:'22/3/2029'
    },
    {
      title: 'Smghmghtylish Kitchen And Dining Room With Functional Ideas',
      content: 'Lhmghhorem Ipsum is simply dummy text of the print and typesetting industry...',
      imageUrl: 'https://via.placeholder.com/300x200',
      username: 'mmk',
      email: 'mm@gmail.com',
      date:'22/3/2029'
    },
    {
      title: 'Stylish Kitchen And Dining Room With Functional Ideas',
      content: 'Lorem Ipsum is simply dummy text of the print and typesetting industry...',
      imageUrl: 'https://via.placeholder.com/300x200',
      username: 'mm3232',
      email: 'mm3232@gmail.com',
      date:'22/3/2019'
    },
    {
      title: 'Stylish Kitchen And Dining Room With Functional Ideas',
      content: 'Lorem Ipsum is simply dummy text of the print and typesetting industry...',
      imageUrl: 'https://via.placeholder.com/300x200',
      username: 'mm3232',
      email: 'mm3232@gmail.com',
      date:'22/3/2019'
    }, {
      title: 'Stylish Kitchen And Dining Room With Functional Ideas',
      content: 'Lorem Ipsum is simply dummy text of the print and typesetting industry...',
      imageUrl: 'https://via.placeholder.com/300x200',
      username: 'mm3232',
      email: 'mm3232@gmail.com',
      date:'22/3/2019'
    }, {
      title: 'Stylish Kitchen And Dining Room With Functional Ideas',
      content: 'Lorem Ipsum is simply dummy text of the print and typesetting industry...',
      imageUrl: 'https://via.placeholder.com/300x200',
      username: 'mm3232',
      email: 'mm3232@gmail.com',
      date:'22/3/2019'
    }, {
      title: 'Stylish Kitchen And Dining Room With Functional Ideas',
      content: 'Lorem Ipsum is simply dummy text of the print and typesetting industry...',
      imageUrl: 'https://via.placeholder.com/300x200',
      username: 'mm3232',
      email: 'mm3232@gmail.com',
      date:'22/3/2019'
    }, {
      title: 'Stylish Kitchen And Dining Room With Functional Ideas',
      content: 'Lorem Ipsum is simply dummy text of the print and typesetting industry...',
      imageUrl: 'https://via.placeholder.com/300x200',
      username: 'mm3232',
      email: 'mm3232@gmail.com',
      date:'22/3/2019'
    }, {
      title: 'Stylish Kitchen And Dining Room With Functional Ideas',
      content: 'Lorem Ipsum is simply dummy text of the print and typesetting industry...',
      imageUrl: 'https://via.placeholder.com/300x200',
      username: 'mm3232',
      email: 'mm3232@gmail.com',
      date:'22/3/2019'
    }, {
      title: 'Stylish Kitchen And Dining Room With Functional Ideas',
      content: 'Lorem Ipsum is simply dummy text of the print and typesetting industry...',
      imageUrl: 'https://via.placeholder.com/300x200',
      username: 'mm3232',
      email: 'mm3232@gmail.com',
      date:'22/3/2019'
    }, {
      title: 'Stylish Kitchen And Dining Room With Functional Ideas',
      content: 'Lorem Ipsum is simply dummy text of the print and typesetting industry...',
      imageUrl: 'https://via.placeholder.com/300x200',
      username: 'mm3232',
      email: 'mm3232@gmail.com',
      date:'22/3/2019'
    },
    // ... other blog entries ...
  ];

  const openModal = (blog, type) => {
    setSelectedBlog(blog);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
    setModalType('');
  };

  return (


    <div className="w-full">
      <DefaultLayout>
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center my-4">Browse by Category</h1>

            {/* Blog Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, index) => (
                <div key={index} className="dark:bg-graydark bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={blog.imageUrl} alt="Blog post" className="w-full h-48 object-cover" />
                  <div className="p-6">
                 

                  <div className="flex justify-between items-center mb-4">
  <p className="dark:text-white text-black text-gray-500 text-sm truncate font-bold">
    User: {blog.username}
  </p>
 
  <p className="dark:text-white text-black text-gray-500 text-sm truncate font-bold">
    Date: {blog.date}
  </p>
</div>
<p className="dark:text-white text-black text-gray-500 text-sm mb-4 truncate font-bold">
Email: {blog.email}</p>
                 

                    <h3 className="dark:text-white text-black text-lg font-semibold mb-2">
                      {blog.title}</h3>
                    <p className="dark:text-white text-black text-gray-500 text-sm mb-4 truncate">{blog.content}</p>
                    <span className="mt-2 inline-block bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-xs mr-2 cursor-pointer" onClick={() => openModal(blog, 'view')}>
                      Read Article
                    </span>
                    <span className="mt-2 inline-block bg-green-100 text-green-500 px-3 py-1 rounded-full text-xs mr-2 cursor-pointer" onClick={() => openModal(blog, 'edit')}>
                      Edit
                    </span>
                    <span className="mt-2 inline-block bg-red-100 text-red-500 px-3 py-1 rounded-full text-xs cursor-pointer" onClick={() => openModal(blog, 'delete')}>
                      Delete
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Browse all posts button */}
            <div className="flex justify-center mt-10">
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300" onClick={() => openModal(blogs[0], 'view')}>
                Browse all Posts
              </button>
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && selectedBlog && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4">
    <div className="bg-white p-8 sm:p-10 rounded-lg shadow-lg max-w-lg w-full h-auto overflow-y-auto relative">
      <button className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-200" onClick={closeModal}>
        Close
      </button>

      {modalType === 'view' && (
        <>
          <img src={selectedBlog.imageUrl} alt="Blog post" className="w-full h-48 sm:h-64 object-cover mb-4 rounded-lg shadow-sm" />
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">{selectedBlog.title}</h2>
          <p className="text-gray-600 mb-4">{selectedBlog.content}</p>
        </>
      )}

      {modalType === 'edit' && (
        <>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Edit Blog: {selectedBlog.title}</h2>
          <textarea className="w-full h-40 sm:h-64 p-4 border border-gray-300 rounded-md mb-4" placeholder="Edit your blog content here...">{selectedBlog.content}</textarea>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200">Save Changes</button>
        </>
      )}

       <Dialog
        open={modalType === 'delete'}
        onClose={onclose}
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
          <Button 
          //</DialogActions>onClick={onDeleteSetting}
          >Yes</Button>
          <Button onClose={onclose} //onClick={onDissmissDeleteModal}
           autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  </div>
)}


        </>
      </DefaultLayout>
    </div>
  );
};

export default YourBlogs;

import { baseUrl } from "../../utils/urls";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/blog` }),
  endpoints: (builder) => ({
    GetBlog: builder.mutation({
      query: () => ({
        url: `getAllBlog`,
        method: "GET",
      }),
    }),
    PostBlog: builder.mutation({
      query: (body) => ({
        body,
        method: "POST",
        url: "postBlog",
      }),
    }),
    EditBlogApi: builder.mutation({
      query: (item) => ({
        url: `editBlog/${item.id}`,
        method: "POST",
        body: item,
      }),
    }),
    DeleteBlogApi: builder.mutation({
      query: (id) => ({
        url: `deleteBlog/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBlogMutation,
  usePostBlogMutation,
  useEditBlogApiMutation,
  useDeleteBlogApiMutation,
} = blogApi;

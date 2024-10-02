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
  }),
});

export const { useGetBlogMutation, usePostBlogMutation } = blogApi;

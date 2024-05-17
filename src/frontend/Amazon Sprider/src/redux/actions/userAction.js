import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utils/urls";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    AddPackage: builder.mutation({
      query: (data) => ({
        url: "product/addPackage",
        method: "POST",
        body: data,
      }),
    }),
    GetPackage: builder.mutation({
      query: () => ({
        url: "product/getPackage",
        method: "GET",
      }),
    }),
    DeletePackage: builder.mutation({
      query: (id) => ({
        url: `product/deletePackage/${id}`,
        method: "DELETE",
      }),
    }),
    EditPackage: builder.mutation({
      query: (item) => ({
        url: `product/editPackage/${item.id}`,
        method: "PATCH",
        body: item,
      }),
    }),
  }),
});

export const {
  useAddPackageMutation,
  useGetPackageMutation,
  useDeletePackageMutation,
  useEditPackageMutation,
} = userApi;

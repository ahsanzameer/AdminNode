import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1020",
  }),
  endpoints: (builder) => ({
    AddPackage: builder.mutation({
      query: (data) => ({
        url: "product/addPackage",
        method: "POST",
        body: data,
      }),
    }),
    GetPackage: builder.query({
      query: () => ({
        url: "product/getPackage",
        method: "GET",
      }),
    }),
  }),
});

export const { useAddPackageMutation, useGetPackageQuery } = userApi;

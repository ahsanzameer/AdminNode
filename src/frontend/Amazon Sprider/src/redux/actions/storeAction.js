import { baseUrl } from "../../utils/urls";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/store` }),
  endpoints: (builder) => ({
    GetStore: builder.mutation({
      query: (page) => ({
        url: `getStore/${page}`,
        method: "GET",
      }),
    }),

    GetSingleStore: builder.mutation({
      query: (item) => ({
        url: `getSingleStore/${item.currentPage}/${item.id}`,
        method: "GET",
      }),
    }),

    SearchStore: builder.mutation({
      query: (item) => ({
        url: "searchStore",
        method: "POST",
        body: item,
      }),
    }),

    SearchStoreProduct: builder.mutation({
      query: (item) => ({
        url: "searchStoreProduct",
        method: "POST",
        body: item,
      }),
    }),

    StoreState: builder.mutation({
      query: (data) => {
        console.log("Data being sent to /addStoreStateApi:", data);
        return {
          url: "/addStoreStateApi",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetStoreMutation,
  useStoreStateMutation,
  useSearchStoreMutation,
  useGetSingleStoreMutation,
  useSearchStoreProductMutation,
} = storeApi;

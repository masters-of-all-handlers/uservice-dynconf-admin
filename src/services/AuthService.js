import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_BASE_URL} from "./constants";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL
  }),
  tagTypes: ["Ticket"],

  endpoints: (build) => ({
    login: build.mutation({
      query: ({login, password}) => ({
        url: "/login",
        body: {login, password},
        method: "POST"
      }),

      providesTags: ["Ticket"],
      invalidatesTags: ["Ticket"],
    }),
  }),
});


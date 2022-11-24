import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_BASE_AUTH_URL} from "../constants";
import {prepareAuthHeaders} from "../utils/auth";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_AUTH_URL,
    prepareHeaders: prepareAuthHeaders
  }),
  tagTypes: ["Ticket"],

  endpoints: (build) => ({
    login: build.mutation({
      query: ({login, password}) => ({
        url: "/login",
        body: {login, password},
        method: "POST",
      }),

      providesTags: ["Ticket"],
      invalidatesTags: ["Ticket"],
    }),
    register: build.mutation({
      query: ({login, password}) => ({
        url: "/register",
        body: {login, password},
        method: "POST",
      }),
    }),
    check: build.query({
      query: () => ({
        url: "/check",
        method: "POST",
      }),
    })
  }),
});

export const {useLoginMutation} = authAPI;

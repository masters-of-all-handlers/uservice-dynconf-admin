import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_BASE_ADMIN_URL, API_CONFIGS_ENDPOINT} from "../constants";
import {prepareAuthHeaders} from "../utils/auth";

export const variableAPI = createApi({
  reducerPath: "variableAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_ADMIN_URL,
    prepareHeaders: prepareAuthHeaders
  }),
  tagTypes: ["Configs"],

  endpoints: (build) => ({
    getConfigs: build.query({
      query: ({limit = 10, page = 1, s = ""}) => ({
        url: API_CONFIGS_ENDPOINT,
        params: {
          limit: limit,
          page: page,
          s: s,
        },
      }),

      providesTags: (result) =>
        result?.items
          ? result.items.map(({uuid}) => ({type: "Configs", uuid}))
          : ["Configs"],
    }),

    getConfigById: build.query({
      query: (uuid) => ({
        url: `${API_CONFIGS_ENDPOINT}/${uuid}`,
      }),

      providesTags: (result, error, uuid) => [{type: "Configs", uuid}],
    }),

    updateVariable: build.mutation({
      query: ({uuid, ...update}) => ({
        url: `${API_CONFIGS_ENDPOINT}/${uuid}`,
        method: "PATCH",
        body: update,
      }),

      invalidatesTags: ["Configs"],
    }),

    createVariable: build.mutation({
      query: (variable) => ({
        url: API_CONFIGS_ENDPOINT,
        method: "POST",
        body: variable,
      }),

      invalidatesTags: ["Configs"],
    }),

    cloneVariable: build.mutation({
      query: ({uuid, ...clone}) => ({
        url: `${API_CONFIGS_ENDPOINT}/${uuid}/clone`,
        method: "POST",
        body: clone,
      }),
      invalidatesTags: ["Configs"],
    }),

    deleteVariableById: build.mutation({
      query: (uuid) => ({
        url: `${API_CONFIGS_ENDPOINT}/${uuid}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Configs"],
    }),
  }),
});

export const {useGetConfigsQuery, useGetConfigByIdQuery} = variableAPI;

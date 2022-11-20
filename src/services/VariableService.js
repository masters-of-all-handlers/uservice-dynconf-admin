import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_BASE_URL, CONFIGS_ENDPOINT} from "./constants";

export const variableAPI = createApi({
  reducerPath: "variableAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL + "/admin/v1",
  }),
  tagTypes: ["Configs"],

  endpoints: (build) => ({
    getConfigs: build.query({
      query: ({limit = 10, page = 1}) => ({
        url: CONFIGS_ENDPOINT,
        params: {
          limit: limit,
          page: page,
        },
      }),

      providesTags: ({items}) =>
        items ? items.map(({uuid}) => ({type: "Configs", uuid})) : ["Configs"],
    }),

    getConfigById: build.query({
      query: (uuid) => ({
        url: `${CONFIGS_ENDPOINT}/${uuid}`,
      }),

      providesTags: (result, error, uuid) => [{type: "Configs", uuid}],
    }),

    updateVariable: build.mutation({
      query: ({id, ...update}) => ({
        url: CONFIGS_ENDPOINT,
        method: "PATCH",
        body: update,
      }),

      invalidatesTags: ["Configs"],
    }),

    createVariable: build.mutation({
      query: (variable) => ({
        url: CONFIGS_ENDPOINT,
        method: "POST",
        body: variable,
      }),

      invalidatesTags: ["Configs"],
    }),
    cloneVariable: build.mutation({
      query: ({id, ...clone}) => ({
        url: `${CONFIGS_ENDPOINT}/${id}/clone`,
        method: "POST",
        body: clone,
      }),
      invalidatesTags: ["Configs"],
    }),

    deleteVariableById: build.mutation({
      query: (uuid) => ({
        url: `${CONFIGS_ENDPOINT}/${uuid}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Configs"],
    }),
  }),
});

export const {useGetConfigsQuery, useGetConfigByIdQuery} = variableAPI;

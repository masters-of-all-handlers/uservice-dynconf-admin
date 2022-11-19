import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const configsEndpoint = "/variables";

export const variableAPI = createApi({
  reducerPath: "variableAPI",
  baseQuery: fetchBaseQuery({
    baseUrl:
      // "https://my-json-server.typicode.com/masters-of-all-handlers/uservice-dynconf-admin",
      "http://10.21.0.234:8083/admin/v1",
  }),
  tagTypes: ["Configs"],

  endpoints: (build) => ({
    getConfigs: build.query({
      query: ({limit = 10, page = 1}) => ({
        url: configsEndpoint,
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
        url: `${configsEndpoint}/${uuid}`,
      }),

      providesTags: (result, error, uuid) => [{type: "Configs", uuid}],
    }),

    updateVariable: build.mutation({
      query: ({id, ...update}) => ({
        url: "/variable",
        method: "PATCH",
        body: update,
      }),

      invalidatesTags: ["Configs"],
    }),

    createVariable: build.mutation({
      query: (variable) => ({
        url: "/variables",
        method: "POST",
        body: variable,
      }),

      invalidatesTags: ["Configs"],
    }),

    deleteVariableById: build.mutation({
      query: (uuid) => ({
        url: `/variables/${uuid}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Configs"],
    }),
  }),
});

export const {useGetConfigsQuery, useGetConfigByIdQuery} = variableAPI;

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const configsEndpoint = "/variables";

export const variableAPI = createApi({
  reducerPath: "variableAPI",
  baseQuery: fetchBaseQuery({
    baseUrl:
      // "https://my-json-server.typicode.com/masters-of-all-handlers/uservice-dynconf-admin",
      "http://10.21.0.234:8083/admin/v1",
  }),
  tagTypes: ["Variables", "Configs"],

  endpoints: (build) => ({
    fetchAllConfigs: build.query({
      query: ({limit = 10, offset = 0}) => ({
        url: configsEndpoint,
        params: {
          limit: limit,
          offset: offset,
        },
      }),

      providesTags: ["Configs"],
    }),

    fetchVariableById: build.query({
      query: (uuid) => ({
        url: `${configsEndpoint}/${uuid}`,
      }),

      providesTags: (result) => {
        return [`variable${result.id}`];
      },
    }),
    updateVariable: build.mutation({
      query: ({id, ...update}) => ({
        url: "/variable",
        method: "PATCH",
        body: update,
      }),

      invalidatesTags: (result) => {
        return [`variable${result.id}`];
      },
    }),
    createVariable: build.mutation({
      query: (variable) => ({
        url: "/variables",
        method: "POST",
        body: variable,
      }),

      invalidatesTags: ["Variables"],
    }),
    deleteVariableById: build.mutation({
      query: (uuid) => ({
        url: `/variable/${uuid}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Variables"],
    }),
  }),
});

export const {useFetchAllConfigsQuery} = variableAPI;

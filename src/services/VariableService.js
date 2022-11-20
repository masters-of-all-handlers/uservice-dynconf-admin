import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_BASE_URL} from "./constants";

const configsEndpoint = "/variables";

export const variableAPI = createApi({
  reducerPath: "variableAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL + "/admin/v1"
  }),
  tagTypes: ["Variables", "Configs"],

  endpoints: (build) => ({
    getConfigs: build.query({
      query: ({limit = 10, offset = 0}) => ({
        url: configsEndpoint,
        params: {
          limit: limit,
          offset: offset,
        },
      }),

      providesTags: ({items}) =>
        items ? items.map(({uuid}) => ({type: "Configs", uuid})) : ["Configs"],
    }),

    fetchVariableById: build.query({
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
    cloneVariable: build.mutation({
      query: ({id, ...clone}) => ({
        url: `/variables/${id}/clone`,
        method: "POST",
        body: clone
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

export const {useGetConfigsQuery} = variableAPI;

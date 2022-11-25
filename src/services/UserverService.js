import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {
  API_BASE_ADMIN_URL,
  API_CONFIGS_ENDPOINT,
  API_SERVICES_ENDPOINT,
} from "../constants";
import {prepareAuthHeaders} from "../utils/auth";

export const userverAPI = createApi({
  reducerPath: "userverAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_ADMIN_URL,
    prepareHeaders: prepareAuthHeaders,
  }),
  tagTypes: ["Configs", "Services"],

  endpoints: (build) => ({
    getConfigs: build.query({
      query: ({limit, page, config, service}) => ({
        url: API_CONFIGS_ENDPOINT,
        params: {
          limit,
          page,
          config,
          service,
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

    createConfig: build.mutation({
      query: (data) => ({
        url: API_CONFIGS_ENDPOINT,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Configs", "Services"],
    }),

    updateConfig: build.mutation({
      query: ({uuid, ...data}) => ({
        url: `${API_CONFIGS_ENDPOINT}/${uuid}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Configs", "Services"],
    }),

    cloneConfig: build.mutation({
      query: ({uuid, ...data}) => ({
        url: `${API_CONFIGS_ENDPOINT}/${uuid}/clone`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Configs", "Services"],
    }),

    deleteConfigById: build.mutation({
      query: (uuid) => ({
        url: `${API_CONFIGS_ENDPOINT}/${uuid}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Configs"],
    }),

    getServices: build.query({
      query: () => ({
        url: API_SERVICES_ENDPOINT,
      }),

      providesTags: ["Services"],
    }),
  }),
});

export const {
  useGetConfigsQuery,
  useGetConfigByIdQuery,
  useCreateConfigMutation,
  useUpdateConfigMutation,
  useCloneConfigMutation,
  useDeleteConfigByIdMutation,

  useGetServicesQuery,
} = userverAPI;

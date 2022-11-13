import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const variableAPI = createApi({
    reducerPath: 'variableAPI',
    baseQuery: fetchBaseQuery({
        baseUrl:
            'https://my-json-server.typicode.com/masters-of-all-handlers/uservice-dynconf-admin',
    }),

    endpoints: (build) => ({
        fetchAllVariables: build.query({
            query: (limit = 10) => ({
                url: '/variables',
                params: {
                    _limit: limit,
                },
            }),
            providesTags: ["variables"],
        }),
        fetchVariableById: build.query({
            query: (id) =>
                ({
                    url: "/variable",
                    params: {
                        id
                    }
                }),
            providesTags: result => {
                return [`variable${result.id}`];
            }
        }),
        updateVariable: build.mutation({
            query: ({id, ...update}) => ({
                url: "/variable",
                method: "PATCH",
                body: update,
            }),
            invalidatesTags: result => {
                return [`variable${result.id}`];
            }
        }),
        createVariable: build.mutation({
            query: (variable) => ({
                url: "/variables",
                method: "POST",
                body: variable
            }),
            invalidatesTags: ["variables"]
        }),
        deleteVariableById: build.mutation({
            query: (id) => ({
                url: "/variable",
                method: "DELETE",
            }),
            invalidatesTags: result => [`variable${result.id}`]
        })
    }),
});

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
                method: "POST",
                body: update,
            }),
            invalidatesTags: result => {
                return [`variable${result.id}`];
            }
        })
    }),
});


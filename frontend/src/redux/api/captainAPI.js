import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = 'http://localhost:5000/api/v1/captains'

export const captainAPI = createApi({
    reducerPath: 'captainAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: url,
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.captain?.token || localStorage.getItem('tokenC')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        registerCaptain: builder.mutation({
            query: (captain) => ({
                url: '/register',
                method: 'POST',
                body: captain,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        loginCaptain: builder.mutation({
            query: (captain) => ({
                url: '/login',
                method: 'POST',
                body: captain
            })
        }),
        getCaptainProfile: builder.query({
            query: () => '/profile'
        }),
        logoutCaptain: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST'
            })
        }),
        deleteCaptain: builder.mutation({
            query: () => ({
                url: '/delete',
                method: 'DELETE'
            })
        })
    })
})

export const {
    useRegisterCaptainMutation,
    useLoginCaptainMutation,
    useDeleteCaptainMutation,
    useGetCaptainProfileQuery,
    useLazyGetCaptainProfileQuery, // Added export for lazy query
    useLogoutCaptainMutation,
} = captainAPI;
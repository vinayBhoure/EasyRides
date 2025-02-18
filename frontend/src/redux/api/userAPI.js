import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const url = 'http://localhost:5000/api/v1/users'

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: url,
        // credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.auth?.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (user) => ({
                url: '/register',
                method: 'POST',
                body: user,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),

        loginUser: builder.mutation({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user
            })
        }),

        getUserProfile: builder.query({
            query: () => '/profile'
        }),

        logoutUser: builder.query({
            query: () => '/logout'
        }),

        deleteUser: builder.mutation({
            query: () => ({
                url: '/delete',
                method: 'DELETE'
            })
        })
    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useGetUserProfileQuery,
    useLogoutUserQuery,
    useDeleteUserMutation
} = userAPI;
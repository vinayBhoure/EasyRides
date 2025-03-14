import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseurl = 'http://localhost:5000/api/v1/maps'
export const mapAPI = createApi({
    reducerPath: 'mapAPI',
<<<<<<< HEAD
    baseQuery: fetchBaseQuery({
        baseUrl: baseurl,
        prepareHeaders: (headers, { getState }) => {
            const userToken = getState()?.user?.token;
            const captainToken = getState()?.captain?.token;

            // Fallback to localStorage if not in Redux state
            const tokenFromStorage = localStorage.getItem('tokenU') || localStorage.getItem('tokenC');

            // Use the first available token
            const token = userToken || captainToken || tokenFromStorage;
=======
    baseQuery: fetchBaseQuery({ 
        baseUrl: baseurl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState?.auth?.token
>>>>>>> ui
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        getCordinates: builder.query({
            query: (address) => `/getCordinates?address=${address}`
        }),
        getDistance: builder.query({
            query: ({ from, to }) => `/getDistance?from=${from}&to=${to}`
        }),
        getSuggestions: builder.query({
            query: (address) => `/getSuggestions?address=${address}`
        })
    })
})

export const {
    useGetCordinatesQuery,
    useGetDistanceQuery,
    useGetSuggestionsQuery
} = mapAPI;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = 'http://localhost:5000/api/v1';

export const rideAPI = createApi({
    reducerPath: 'rideAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: url,
        prepareHeaders: (headers, { getState }) => {
            const userToken = getState()?.user?.token;
            const captainToken = getState()?.captain?.token;

            // Fallback to localStorage if not in Redux state
            const tokenFromStorage = localStorage.getItem('tokenU') || localStorage.getItem('tokenC');

            // Use the first available token
            const token = userToken || captainToken || tokenFromStorage;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers
        }
    }),
    endpoints: (builders) => ({
        getFare: builders.query({
            query: ({ pickup, destination }) => `/rides/getFare?pickup=${pickup}&destination=${destination}`
        }),
        createRide: builders.mutation({
            query: ({ pickup, destination, vehicleType }) => ({
                url: '/rides/create',
                method: 'POST',
                body: { pickup, destination, vehicleType }
            })
        })
    })
});

export const { useGetFareQuery, useCreateRideMutation } = rideAPI;
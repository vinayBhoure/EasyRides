import { createSlice } from "@reduxjs/toolkit";

const rideSlice = createSlice({
    name:'ride',
    initialState: {
        ride: null,
        isRide: false
    },
    reducers: {
        updateRideInfo: (state, action) => {
            state.ride = action.payload,
                state.isRide = true
        },
        deleteRideInfo: (state) => {
            state.ride = null,
                state.isRide = true
        }
    }
})

export const {updateRideInfo, deleteRideInfo} = rideSlice.actions
export default rideSlice.reducer
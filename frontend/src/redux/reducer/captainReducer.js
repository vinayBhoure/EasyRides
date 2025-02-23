import { createSlice } from "@reduxjs/toolkit";

const captainSlice = createSlice({
    name: 'captain',
    initialState: {
        captain: {},
        token: null,
        isAuthenticated: false
    },
    reducers: {
        captainExist: (state, action) => {
            state.captain = action.payload.captain
            state.token = action.payload.tokenC,
                state.isAuthenticated = true
        },
        captainNotExist: (state, action) => {
            state.captain = {},
                state.token = null,
                state.isAuthenticated = false
        }
    }
})

export const { captainExist, captainNotExist } = captainSlice.actions
export default captainSlice.reducer;
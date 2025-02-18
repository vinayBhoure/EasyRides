import { createSlice } from '@reduxjs/toolkit'

const userState = {
    user: {},
    token: null,
    loggedIn: false,
}
const userSlice = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {
        userExist: (state, action) => {
            // action is an object with payload
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.loggedIn = true
        },
        userNotExist: (state, action) => {

            state.user = {},
                state.token = null,
                state.loggedIn = false
        }
    }
});

export const { userExist, userNotExist } = userSlice.actions;
export default userSlice.reducer;
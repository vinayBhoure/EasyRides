import { configureStore } from '@reduxjs/toolkit';
import  userReducer from './reducer/userReducer'
import  { userAPI } from './api/userAPI'
import captainReducer from './reducer/captainReducer'
import { captainAPI } from './api/captainAPI'

const store = configureStore({
    reducer: {
        // object and value using []: __ defined for apis only
        [userAPI.reducerPath]: userAPI.reducer,
        [captainAPI.reducerPath]: captainAPI.reducer,

        //reducers must be defined like this
        user: userReducer,
        captain: captainReducer
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().
        concat(userAPI.middleware).
        concat(captainAPI.middleware)
    }
});

export default store;
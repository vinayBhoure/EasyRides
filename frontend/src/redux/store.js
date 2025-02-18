import { configureStore } from '@reduxjs/toolkit';
import  userReducer from './reducer/userReducer'
import  { userAPI } from './api/userAPI'

const store = configureStore({
    reducer: {
        // object and value using []: __ defined for apis only
        [userAPI.reducerPath]: userAPI.reducer,

        //reducers must be defined like this
        user: userReducer
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(userAPI.middleware)
    }
});

export default store;
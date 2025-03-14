import { configureStore } from '@reduxjs/toolkit';

import { userAPI } from './api/userAPI'
import { captainAPI } from './api/captainAPI'
import { mapAPI } from './api/mapAPI';

import userReducer from './reducer/userReducer'
import captainReducer from './reducer/captainReducer'

const store = configureStore({
    reducer: {
        // object and value using []: __ defined for apis only
        [userAPI.reducerPath]: userAPI.reducer,
        [captainAPI.reducerPath]: captainAPI.reducer,
        [mapAPI.reducerPath]: mapAPI.reducer,

        //reducers must be defined like this
        user: userReducer,
        captain: captainReducer
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().
            concat(userAPI.middleware).
            concat(captainAPI.middleware).
            concat(mapAPI.middleware)
    }
});

export default store;
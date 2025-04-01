import { configureStore } from '@reduxjs/toolkit';

import { userAPI } from './api/userAPI'
import { captainAPI } from './api/captainAPI'
import { mapAPI } from './api/mapAPI';

import userReducer from './reducer/userReducer'
import captainReducer from './reducer/captainReducer'
import { rideAPI } from './api/rideAPI';
import socketReducer, { initializeSocket } from './reducer/socketReducer';
import rideReducer from './reducer/rideReducer';

const store = configureStore({
    reducer: {
        // object and value using []: __ defined for apis only
        [userAPI.reducerPath]: userAPI.reducer,
        [captainAPI.reducerPath]: captainAPI.reducer,
        [mapAPI.reducerPath]: mapAPI.reducer,
        [rideAPI.reducerPath]: rideAPI.reducer,

        //reducers must be defined like this
        user: userReducer,
        captain: captainReducer,
        socket: socketReducer, // Add socket reducer
        ride: rideReducer
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().
            concat(userAPI.middleware).
            concat(captainAPI.middleware).
            concat(mapAPI.middleware).
            concat(rideAPI.middleware)
    }
});

// Dispatch initializeSocket to connect the socket automatically
store.dispatch(initializeSocket());

export default store;
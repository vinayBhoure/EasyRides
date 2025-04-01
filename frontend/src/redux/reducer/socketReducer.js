import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

let socket = null; // Manage the socket instance outside the Redux state

const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        connected: false,
        socketId: null,
    },
    reducers: {
        setSocketConnected: (state, action) => {
            state.connected = action.payload.connected;
            state.socketId = action.payload.socketId;
        },
        setSocketDisconnected: (state) => {
            state.connected = false;
            state.socketId = null;
        },
        disconnectSocket: (state) => {
            if (socket) {
                socket.disconnect();
                socket = null;
                state.connected = false;
                state.socketId = null;
            }
        },
    },
});

export const { setSocketConnected, setSocketDisconnected, disconnectSocket } = socketSlice.actions;

export const initializeSocket = () => (dispatch) => {
    if (!socket) {
        socket = io('http://localhost:5000'); // Replace with your server URL
        socket.on('connect', () => {
            dispatch(setSocketConnected({ connected: true, socketId: socket.id }));
        });
        socket.on('disconnect', () => {
            dispatch(setSocketDisconnected());
        });
    }
};

export const getSocketInstance = () => socket; // Expose the socket instance for direct use

export default socketSlice.reducer;

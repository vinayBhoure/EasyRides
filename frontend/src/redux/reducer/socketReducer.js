import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

const socketState = {
    socket: io('http://localhost:5000'), // Automatically connect to the server
    connected: false,
};

const socketSlice = createSlice({
    name: 'socket',
    initialState: socketState,
    reducers: {
        initializeSocket: (state) => {
            state.socket.on('connect', () => {
                state.connected = true;
            });
            state.socket.on('disconnect', () => {
                state.connected = false;
            });
        },
        sendMessage: (state, action) => {
            const { eventName, message } = action.payload;
            if (state.socket && state.connected) {
                state.socket.emit(eventName, message);
            }
        },
        receiveMessage: (state, action) => {
            const { eventName, callback } = action.payload;
            if (state.socket) {
                state.socket.on(eventName, callback);
            }
        },
        disconnectSocket: (state) => {
            if (state.socket) {
                state.socket.disconnect();
                state.connected = false;
                state.socket = null;
            }
        },
    },
});

export const { initializeSocket, sendMessage, receiveMessage, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;

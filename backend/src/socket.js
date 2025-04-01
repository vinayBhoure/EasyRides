const socketIO = require('socket.io');
const UserModel = require('./models/User');
const CaptainModel = require('./models/captainModel');
const captainModel = require('./models/captainModel');
let io;

function initializeSocket(server) {
    io = socketIO(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });
    io.on('connection', (socket) => {
        console.log('Socket connection Started:', socket.id);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (userType === 'user') {
                const res = await UserModel.findByIdAndUpdate(
                    userId,
                    { socketId: socket.id },
                    { new: true }
                )
                socket.join('users');
                console.log('User joined:', socket.id);
            } else if (userType === 'captain') {
                const res = await CaptainModel.findByIdAndUpdate(
                    userId,
                    { socketId: socket.id },
                    { new: true }
                )
                socket.join('captains');
                console.log('Captain joined:', socket.id);
            }
        })

        socket.on('update-location-captain', async (data) => {

            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }
            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            })
        })

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
}

function sendMessageToSocketId(socketId, messageObject) {
    if (io) {
        console.log(`Sending event '${messageObject.event}' to socketId: ${socketId}`);
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.error('Socket.io is not initialized.');
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};

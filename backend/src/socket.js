const socketIO = require('socket.io');
const UserModel = require('./models/User');
const CaptainModel = require('./models/captainModel');
let io;

function initializeSocket(server) {
    io = socketIO(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (userType === 'user') {
                await UserModel.findByIdAndUpdate(
                    userId,
                    { socketId: socket.id },
                    // { new: true } 
                )
                socket.join('users');
            } else if (userType === 'captain') {
                await CaptainModel.findByIdAndUpdate(
                    userId,
                    { socketId: socket.id },
                    // { new: true }
                )
                socket.join('captains');
            }
        })

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
}

function sendMessageToSocketId(socketId, message) {
    if (io) {
        io.to(socketId).emit('message', message);
    } else {
        console.error('Socket.io is not initialized.');
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};

require('dotenv').config();
const connectDB = require('./config/connectDB');
const globalCatch = require('./middlewares/globalCatch');
const { initializeSocket } = require('./socket'); // Import the initializeSocket function

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors()); // to enable CORS
app.use(express.json()); // to parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the server!');
})

const userRoute = require('./routes/userRoute');
app.use('/api/v1/users', userRoute);

const captainRoute = require('./routes/captainRoute');
app.use('/api/v1/captains', captainRoute);

const mapRoutes = require('./routes/mapRoutes');
app.use('/api/v1/maps', mapRoutes);

const rideRoutes = require('./routes/rideRoutes');
app.use('/api/v1/rides', rideRoutes);

app.use(globalCatch);

connectDB().then(() => {
    console.log('Database connected successfully.');

    const server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    initializeSocket(server); // Initialize the socket with the server instance
    console.log('Socket server initialized.');
}).catch((err) => {
    console.error('Database connection failed:', err);
});
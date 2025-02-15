require('dotenv').config();
const connectDB = require('./config/connectDB');
const globalCatch = require('./middlewares/globalCatch');

const express = require('express');
const app = express();
const port = process.env.PORT ||  3000;
const cors = require('cors');

app.use(cors()); // to enable CORS
app.use(express.json()); // to parse the incoming requests with JSON payloads

app.get('/', (req, res) => {
    res.send('Welcome to the server!');
})


app.use(globalCatch);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
connectDB(); 
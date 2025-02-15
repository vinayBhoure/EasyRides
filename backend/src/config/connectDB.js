const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log("MongoDB connected successfully");
        });
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;
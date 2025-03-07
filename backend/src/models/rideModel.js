const mongoose = require('mongoose');
const UserModel = require('./User');

const RideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'ongoing', 'accepted', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration: { // inseconds
        type: Number
    },
    distance: { // in meters
        type: Number
    },
    paymentId: {
        type: String
    },
    orderId: {
        type: String
    },
    signature: {
        type: String
    },
    otp: {
        type: Number,
        required: true,
        select: false
    }
});

const RideModel = mongoose.model('Rides', RideSchema);
module.exports = RideModel;
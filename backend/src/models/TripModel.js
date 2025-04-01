const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    captain: {
        type: mongoose.Schema.ObjectId,
        ref: 'Captain'
    },
    distance: {
        type: Number,
        default: 0
    },
    earning: {
        type: Number,
        default: 0.00
    }
});

const TripModel = mongoose.model('Trip', TripSchema);
module.exports = TripModel;
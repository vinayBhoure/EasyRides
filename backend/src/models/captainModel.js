const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const validator = require('validator');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: [true, 'Firstname is required'],
            minlength: 3
        },
        lastname: {
            type: String,
            required: [true, 'Lastname is required'],
            minlength: 3
        }
    },
    email: {
        type: String,
        required: true,
        unique: [true, `Email already exists`],
        lowercase: true,
        isValidate: [validator.default.isEmail, `Invalid email`],
    },
    password: {
        type: String,
        required: true,
        minlength: [8, `Password can't be less than 8 characters`],
        select: false, // hide password when ever return user.
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['inactive', 'active'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, `atleast 3 characters`]
        },
        number_plate: {
            type: String,
            required: [true, 'Number plate is required'],
            unique: true,
            minlength: [10, 'At least 10 characters'],
            default: 'UNKNOWN' // Ensure it's never null
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Atleast 1 seat available']
        },
        type: {
            type: String,
            enum: ['auto', 'car', 'bike'],
            required: true
        }
    },
    location: {
        ltd: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
});

captainSchema.methods.generateToken = async function () {
    const captain = this;
    return jwt.sign({ _id: captain._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

captainSchema.methods.comparePassword = async function (password) {
    const captain = this;
    return await bcrypt.compare(password, captain.password);
}

captainSchema.statics.hashedPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

// Create Partial Unique Index to prevent duplicate non-null values
captainSchema.index(
    { "vehicle.number_plate": 1 },
    { unique: true, partialFilterExpression: { "vehicle.number_plate": { $ne: null } } }
);

module.exports = mongoose.model('Captain', captainSchema);
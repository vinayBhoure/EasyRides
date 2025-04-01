const asyncError = require("../middlewares/asyncError");
const BlackListedToken = require("../models/BlackListedToken");
const CaptainModel = require('../models/captainModel')
const stringToVehicle = require('../utility/stringToVehicle')
const bcrypt = require('bcrypt');
const { sendMessageToSocketId } = require("../socket");

const registerCaptain = asyncError(async (req, res) => {
    const {
        fullname,
        email,
        password,
        status,
        vehicle: {
            color,
            number_plate,
            capacity,
            type
        },
        location: {
            latitude,
            longitude
        }
    } = req.body;

    if (!fullname || !password || !email ||
        !color || !number_plate || !capacity || !type) {
        return res.status(500).json({
            success: false,
            message: 'all fields are required'
        });
    }

    const formattedNumberPlate = stringToVehicle(number_plate) || "UNKNOWN";
    if (!formattedNumberPlate || formattedNumberPlate === "invalid number plate") {
        return res.status(400).json({
            success: false,
            message: 'Invalid number plate format'
        });
    }
    let captain = await CaptainModel.findOne({ email });
    if (captain) {
        return res.status(401).json({
            success: false,
            message: 'already exists'
        });
    }

    let existingVehicle = await CaptainModel.findOne({ "vehicle.number_plate": formattedNumberPlate });
    if (existingVehicle) {
        return res.status(409).json({
            success: false,
            message: 'Number plate already registered'
        });
    }

    const hashedPassword = await CaptainModel.hashedPassword(password);

    const newCaptain = new CaptainModel({
        fullname,
        email,
        password: hashedPassword,
        status,
        vehicle: {
            color,
            number_plate: formattedNumberPlate,
            capacity,
            type
        },
        location: {
            latitude,
            longitude
        }
    });

    try {
        await newCaptain.save();
    } catch (error) {
        if (error.code === 11000 && error.keyPattern['vehicle.number_plate']) {
            return res.status(400).json({
                success: false,
                message: 'Number plate already exists'
            });
        }
        throw error;
    }

    const token = await newCaptain.generateToken();
    res.status(200).json({
        success: true,
        message: 'captain successfully registered',
        captain: newCaptain,
        token
    });
});

const loginCaptain = asyncError(async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        return res.status(401).json({
            success: false,
            message: 'Email and Password required'
        })
    }

    let captain;
    captain = await CaptainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(401).json({
            success: false,
            message: 'Invalid user'
        })
    }
    
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({
            success: 'false',
            message: 'Invalid credentials'
        });
    }

    const token = await captain.generateToken()
    res.status(200).json({
        success: true,
        message: 'captain login successfully',
        token,
        captain
    })
});

const getCaptainProfile = asyncError(async (req, res) => {
    res.status(200).json({
        success: true,
        captain: req.captain
    })
});

const updateCaptainStatus = asyncError(async( req, res) => {
    const captainId = req.captain._id;

    const captain = await CaptainModel.findById(captainId);
    if (!captain) {
        return res.status(404).json({
            success: false,
            message: 'Captain not found'
        });
    }

    captain.status = captain.status === 'inactive' ? 'active' : 'inactive';
    await captain.save();

    res.status(200).json({
        success: true,
        message: 'Captain status updated successfully',
        status: captain.status
    });

    sendMessageToSocketId(captain.socketId, {
        event: 'status-updated',
        data: captain
    })
    
});

const logoutCaptain = asyncError(async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const expToken = await BlackListedToken.create({ token: token })
    res.status(200).json({
        success: true,
        message: 'logged out'
    })
});

const terminateCaptain = asyncError(async (req, res) => {
    await CaptainModel.deleteOne({ _id: req.captain._id });
    res.status(200).json({
        success: true,
        message: 'Captain deleted succesfully'
    })
});

module.exports = {
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    logoutCaptain,
    terminateCaptain,
    updateCaptainStatus
}
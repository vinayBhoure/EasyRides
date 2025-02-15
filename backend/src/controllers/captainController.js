const asyncError = require("../middlewares/asyncError");
const BlackListedToken = require("../models/BlackListedToken");
const CaptainModel = require('../models/captainModel')
const stringToVehicle = require('../utility/stringToVehicle')

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

    if (!fullname || !password || !email || !socketId ||
        !color || !number_plate || !capacity || !type) {
        return res.status(500).json({
            success: false,
            message: 'all fields are required'
        })
    }

    let captain = await CaptainModel.findOne({ email });
    if (captain) {
        return res.status(401).json({
            success: false,
            message: 'already exists'
        })
    }

    const hashedPassword = await CaptainModel.hashedPassword(password);

    const newCaptain = new CaptainModel({
        fullname,
        email,
        password: hasedPassword,
        status,
        vehicle: {
            color,
            number_plate: stringToVehicle(number_plate),
            capacity,
            type
        },
        location: {
            latitude,
            longitude
        }
    })

    const token = await newCaptain.generateToken();
    res.status(400).json({
        success: true,
        message: 'captain successfully registered',
        newCaptain,
        token
    })


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
        user: req.user
    })
});
const logoutCaptain = asyncError(async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const expToken = await BlackListedToken.findOne({ token: token });
    res.status(200).json({
        success: true,
        message: 'logged out'
    })
});

const terminateCaptain = asyncError(async (req, res) => {
    await CaptainModel.deleteOne({ _id: req.user._id });
    res.status(200).json({
        success:true,
        message:'Captain deleted succesfully'
    })
});

module.exports = {
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    logoutCaptain,
    terminateCaptain
}
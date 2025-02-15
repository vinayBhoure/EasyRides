const UserModel = require('../models/User');
const asyncError = require('../middlewares/asyncError');
const BlackListedToken = require('../models/BlackListedToken')

const registerUser = asyncError(async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({
            success: 'false',
            message: 'All fields are required'
        });
    }

    let user;
    user = await UserModel.findOne({ email });
    if (user) {
        return res.status(400).json({
            success: 'false',
            message: 'User already exists'
        });
    }

    const hashedPassword = await UserModel.hashedPassword(password);

    const newUser = new UserModel({
        fullname,
        email,
        password: hashedPassword
    })

    await newUser.save();
    const token = await newUser.generateToken();
    res.status(201).json({
        success: 'true',
        message: 'User registered successfully',
        user: newUser,
        token
    });

});

const loginUser = asyncError(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: 'false',
            message: 'All fields are required'
        });
    }

    let user;
    user = await UserModel.findOne({ email }).select('+password');
    // select('+password') because model me select false which means, db will never return password along with user docuement.
    //   |-> this enable mode to return the password for that query only 
    if (!user) {
        return res.status(400).json({
            success: 'false',
            message: 'Invalid credentials'
        });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({
            success: 'false',
            message: 'Invalid credentials'
        });
    }

    const token = await user.generateToken();
    res.status(200).json({
        success: 'true',
        message: 'User logged in successfully',
        user,
        token
    });
});

const getUserProfile = asyncError(async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});

const logoutUser = asyncError(async ( req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const expToken = await BlackListedToken.create({token});

    res.status(200).json({
        success: true,
        message:'Successfully Logut'
    })
})

module.exports = { registerUser, loginUser, getUserProfile, logoutUser };

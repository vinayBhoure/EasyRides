const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const asyncError = require('./asyncError');
const BlackListedToken = require('../models/BlackListedToken')

const verifyUser = asyncError(async(req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            success: false,
            message: 'User is not logged in.'
        });
    }

    const token = req.headers.authorization.split(' ')[1];
    
    const expToken = await BlackListedToken.findOne({token: token});
    if(expToken){
        return res.status(401).json({
            success:false,
            message:'Login Token Expired'
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded._id) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }

    const user = await UserModel.findById(decoded._id);
    req.user = user;
    next();

})

module.exports = verifyUser;
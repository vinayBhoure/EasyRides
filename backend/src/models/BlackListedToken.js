const mongoose = require('mongoose')

const ExpTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true
    },
    createdAt:{
        type:Date,
        default :Date.now,
        expires: 84600 
    }
});

const BlackListedToken = mongoose.model('ExpToken', ExpTokenSchema);
module.exports = BlackListedToken;
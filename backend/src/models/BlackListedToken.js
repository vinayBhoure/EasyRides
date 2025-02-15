const mongoose = require('mongoose')

const schema = new mongoose.Schema({
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

const ExpToken = mongoose.model('ExpToken', schema);
module.exports = ExpToken;
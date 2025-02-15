const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
    {
      fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, `Firstname can't be less than 3 characters`],
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, `Lastname can't be less than 3 characters`],
        }
      },
        email: {
            type: String,
            required: true,
            unique: [true, `Email already exists`],
            lowercase: true, 
            isValidate:[validator.default.isEmail, `Invalid email`],
        },
        password: {
            type: String,
            required: true,
            minlength: [8, `Password can't be less than 8 characters`],
            select: false, // hide password when ever returb user.
        },
        socketId: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

UserSchema.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    return token;
};

UserSchema.methods.comparePassword = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
};

UserSchema.statics.hashedPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
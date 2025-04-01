const asyncError = require("../middlewares/asyncError");
const RideModel = require("../models/rideModel");
const { getDistanceBetweenLocation } = require("./mapService");
const crypto = require('crypto');

const getFareService = (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('provide destination and pickup')
    }

    // const { distance, duration } = await getDistanceBetweenLocation(pickup, destination);
    const distance = 3000
    const duration = 300
    const baseFare = {
        auto: 30,
        car: 50,
        bike: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        bike: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        bike: 1.5
    };



    const fare = {
        auto: Math.round(baseFare.auto + ((distance / 1000) * perKmRate.auto) + ((duration / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distance / 1000) * perKmRate.car) + ((duration / 60) * perMinuteRate.car)),
        bike: Math.round(baseFare.bike + ((distance / 1000) * perKmRate.bike) + ((duration / 60) * perMinuteRate.bike))
    };


    return {
        success: true,
        data: fare
    };

}

const generateOTP = (num) => {
    return crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
}

const createRideService = async ({
    user, pickup, destination, vehicleType
}) => {

    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('provide all the inputs')
    }

    const fare = getFareService(pickup, destination);
    if (fare.success === false) {
        return {
            success: false,
            message: 'unable to get fare'
        }
    }

    const ride = await RideModel.create({
        user,
        pickup,
        destination,
        fare: fare.data[vehicleType],
        otp: generateOTP(4)
    })

    return {
        success: true,
        data: ride
    };
}

const confirmRideService = async (rideId, captainId) => {
    if (!rideId) {
        return {
            success: false,
            message: 'no ride '
        }
    }

    await RideModel.findByIdAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captainId
    })

    const ride = await RideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return {
        success: true,
        data: ride
    }

}

module.exports = { createRideService, getFareService, confirmRideService };
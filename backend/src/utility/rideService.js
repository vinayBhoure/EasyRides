const asyncError = require("../middlewares/asyncError");
const RideModel = require("../models/rideModel");
const { getDistanceBetweenLocation } = require("./mapService");
const crypto = require('crypto');

const getFareService = async (pickup, destination) => {
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
        bike: Math.round(baseFare.moto + ((distance / 1000) * perKmRate.moto) + ((duration / 60) * perMinuteRate.moto))
    };


    return fare;

}

const generateOTP = (num) => {
    return crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
}

const createRideService = asyncError(async ({
    user, pickup, destination, vehicleType
}) => {

    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('provide all the inputs')
    }

    const fare = await getFareService(pickup, destination);

    console.log(fare);
    const ride = RideModel.create({
        user,
        pickup,
        destination,
        fare: fare[vehicleType],
        otp: generateOTP(4)
    })

    return ride;
})

module.exports = createRideService;
const asyncError = require("../middlewares/asyncError");
const { createRideService, getFareService } = require("../utility/rideService");

const createRide = asyncError(async (req, res) => {

    const user = req.user?._id;
    const { pickup, destination, vehicleType } = req.body;

    const ride = await createRideService({ user, pickup, destination, vehicleType: vehicleType.toLowerCase() })
    if (ride.success === false) {
        return res.status(400).json({
            success: false,
            message: 'cannot create ride'
        })
    }

    res.status(200).json({
        success: true,
        ride: ride.data,
        message: 'Ride created Successfully'
    })

})

const getFare = asyncError(async (req, res) => {
    const { pickup, destination } = req.query;
    if (!pickup || !destination) {
        return res.status(400).json({
            success: false,
            message: 'provide pickup and destination'
        })
    }
    const fare = getFareService(pickup, destination);
    if (fare.success === false) {
        return res.status(400).json({
            success: false,
            message: 'unable to get fare'
        })
    }
    res.status(200).json({
        success: true,
        fare: fare.data,
        message: 'Fare calculated Successfully'
    })
});

module.exports = { createRide, getFare };
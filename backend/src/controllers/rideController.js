const asyncError = require("../middlewares/asyncError");
const createRideService = require("../utility/rideService");

const createRide = asyncError(async (req, res) => {

    const user = req.user?._id;
    const { pickup, destination, vehicleType } = req.body;

    const ride = await createRideService({ user, pickup, destination, vehicleType })

    res.status(200).json({
        success: true,
        ride: ride,
        message: 'Ride created Successfully'
    })

})

module.exports = createRide;
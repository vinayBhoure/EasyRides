const asyncError = require("../middlewares/asyncError");
const RideModel = require("../models/rideModel");
const TripModel = require("../models/TripModel");
const { sendMessageToSocketId } = require("../socket");
const { getLocationCoordinates, getCaptainsInTheRadius } = require("../utility/mapService");
const { createRideService, getFareService, confirmRideService } = require("../utility/rideService");

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

    const pickupCordinates = await getLocationCoordinates(pickup);

    const captainInRadius = await getCaptainsInTheRadius(pickupCordinates.data.ltd, pickupCordinates.data.lng, 1000);

    ride.data.otp = ""

    const rideWithUser = await RideModel.findOne({ _id: ride.data._id }).populate('user');
    captainInRadius
        .filter((captain) => captain.status === 'active')
        .map((captain) => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            });
        });
})

const confirmRide = asyncError(async (req, res) => {
    const captainId = req.captain._id;
    const { rideId } = req.body;
    const ride = await confirmRideService(rideId, captainId);
    if (ride.success === false) {
        return res.status(400).json(ride);
    }

    res.status(200).json(ride);
    sendMessageToSocketId(ride.data.user.socketId, {
        event: 'ride-confirmed',
        data: ride
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

const startRide = asyncError(async (req, res) => {
    const { rideId, otp } = req.body;
    const captain = req.captain;

    if (!rideId || !otp) {
        return res.status(400).json({
            success: false,
            message: 'provide rideid and otp'
        })
    }

    const ride = await RideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');
    if (!ride) {
        return res.status(400).json({
            success: false,
            message: 'Ride does not found'
        })
    }

    if (ride.status !== 'accepted') {
        return res.status(400).json({
            success: false,
            message: 'accept ride first'
        })
    }

    if (parseInt(ride.otp) !== parseInt(otp)) {
        console.log(`ride-otp: ${ride.otp} and otp : ${otp}`);
        return res.status(400).json({
            success: false,
            message: 'incorrect otp'
        })
    }

    await RideModel.findByIdAndUpdate({
        _id: rideId
    },
        {
            status: 'ongoing'
        })

    res.status(200).json({
        success: true,
        message: 'ride started',
        data: ride
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    })

    if (captain) {
        sendMessageToSocketId(ride.captain.socketId, {
            event: 'ride-started',
            data: ride
        })
    }

})

const endRide = asyncError(async (req, res) => {
    const captainId = req.captain._id
    const { rideId } = req.body;

    const ride = await RideModel.findOne({
        _id: rideId,
        captain: captainId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        return res.status(400).json({
            success: false,
            message: 'ride not found'
        })
    }


    if (ride.status !== 'ongoing') {
        return res.status(400).json({
            success: false,
            message: 'ride not started'
        })
    }

    await RideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    const trip = await TripModel.create({
        captain: ride.captain._id,
        distance: ride.distance,
        earning: ride.fare
    })

    if(!trip){
        console.log('cannot added trip');
    }

    res.status(200).json({
        success: true,
        data: ride
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-completed',
        data: ride
    })

    if (ride.captain) {
        sendMessageToSocketId(ride.captain.socketId, {
            event: 'ride-completed',
            data: ride
        })
    }
})

const cancelRide = asyncError(async (req, res) => {
    const { rideId } = req.body;
    const ride = await RideModel.findOne({ _id: rideId }).populate('user').populate('captain');

    if (!ride) {
        return res.status(400).json({
            success: false,
            message: 'ride not found'
        });
    }

    if (ride.status === 'completed') {
        return res.status(400).json({
            success: false,
            message: 'cannot cancel a completed ride'
        });
    }

    await RideModel.findByIdAndUpdate(rideId, { status: 'cancelled' });

    res.status(200).json({
        success: true,
        message: 'ride cancelled successfully'
    });

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-cancelled',
        data: ride
    });

    if (ride.captain) {
        sendMessageToSocketId(ride.captain.socketId, {
            event: 'ride-cancelled',
            data: ride
        });
    }

})

module.exports = { createRide, getFare, confirmRide, startRide, endRide, cancelRide };
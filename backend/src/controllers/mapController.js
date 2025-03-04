const asyncError = require('../middlewares/asyncError');
const { getLocationCoordinates, getDistanceBetweenLocation, getSuggestionsForAddress } = require('../utility/mapService');

const getCordinates = asyncError(async (req, res) => {
    const { address } = req.query;

    const result = await getLocationCoordinates(address);
    res.status(200).json({
        success: true,
        cordinates: result
    });
})

const getDistance = asyncError(async (req, res) => {
    const { from, to } = req.query;

    const result = await getDistanceBetweenLocation(from, to);
    res.status(200).json({
        success: true,
        distance: result.distance,
        duration: result.duration
    });
});

const getSuggestions = asyncError(async (req, res) => {
    const { address } = req.query
    const suggestions = await getSuggestionsForAddress(address);
    res.status(200).json({
        success: true,
        suggestions
    });
});

module.exports = { getCordinates, getDistance, getSuggestions }
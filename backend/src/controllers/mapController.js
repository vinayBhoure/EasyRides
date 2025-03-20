const asyncError = require('../middlewares/asyncError');
const { getLocationCoordinates, getDistanceBetweenLocation, getSuggestionsForAddress } = require('../utility/mapService');

const getCordinates = asyncError(async (req, res) => {
    const { address } = req.query;

    const result = await getLocationCoordinates(address);
    if (result.success === false) {
        return res.status(400).json(result)
    }
    res.status(200).json({
        success: true,
        cordinates: result.data
    });
})

const getDistance = asyncError(async (req, res) => {
    const { from, to } = req.query;

    const result = await getDistanceBetweenLocation(from, to);
    if (result.success === false) {
        return res.status(400).json(result)
    }
    res.status(200).json({
        success: true,
        distance: result.data.distance,
        duration: result.data.duration
    });
});

const getSuggestions = asyncError(async (req, res) => {
    const { address } = req.query
    const suggestions = await getSuggestionsForAddress(address);
    if (suggestions.success === false) {
        return res.status(400).json(suggestions);
    }
    res.status(200).json({
        success: true,
        suggestions: suggestions.data
    });
});

module.exports = { getCordinates, getDistance, getSuggestions }
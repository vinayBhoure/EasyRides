const asyncError = require('../middlewares/asyncError')

const getLocationCoordinates = asyncError(async (address) => {
    // Validate input
    if (!address) {
        throw new Error('Address is required');
    }

    const API_KEY = process.env.GOOGLE_MAP_API_KEY;
    // console.log('api-key -> ', API_KEY)
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;


    const res = await fetch(url);
    const data = await res.json();

    if (data.status === 'OK' && data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return {
            latitude: location.lat,
            longitude: location.lng
        };
    } else {
        throw new Error(`Geocoding failed with status: ${data.status}`);
    }
});

const getDistanceBetweenLocation = asyncError(async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Both origin and destination are required');
    }

    const API_KEY = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();


    if (data.status === 'OK') {
        const element = data.rows[0].elements[0];
        if (element.status === 'OK') {
            return {
                distance: element.distance.text,
                duration: element.duration.text
            };
        } else if (element.status === 'ZERO_RESULTS') {
            throw new Error('No route found between origin and destination');
        } else {
            throw new Error(`Route calculation failed with status: ${element.status}`);
        }
    } else {
        throw new Error(`API request failed with status: ${data.status}`);
    }

})

const getSuggestionsForAddress = asyncError(async (address) => {
    if (!address) {
        throw new Error('Address input is required');
    }

    const API_KEY = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(address)}&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.predictions) {
        return data.predictions.map(prediction => ({
            description: prediction.description,
            placeId: prediction.place_id,
            mainText: prediction.structured_formatting?.main_text || '',
            secondaryText: prediction.structured_formatting?.secondary_text || ''
        }));
    } else {
        throw new Error(`Failed to get suggestions: ${data.status}`);
    }
});
module.exports = { getLocationCoordinates, getDistanceBetweenLocation, getSuggestionsForAddress };
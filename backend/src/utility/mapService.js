const asyncError = require('../middlewares/asyncError')

const getLocationCoordinates = async (address) => {
    // Validate input
    if (!address) {
        return {
            success: false,
            error: 'Address is required'
        }
    }

    const API_KEY = process.env.GOOGLE_MAP_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;


    const res = await fetch(url);
    const data = await res.json();

    if (data.status === 'OK' && data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return {
            success: true,
            data: {
                latitude: location.lat,
                longitude: location.lng
            }
        };
    } else {
        return {
            success: false,
            error: `Geocoding failed with status: ${data.status}`
        }
    }
};

const getDistanceBetweenLocation = async (origin, destination) => {
    if (!origin || !destination) {
        return {
            success: false,
            error: 'Origin and destination are required'
        }
    }

    const API_KEY = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();


    if (data.status === 'OK') {
        const element = data.rows[0].elements[0];
        if (element.status === 'OK') {
            return {
                success: true,
                data: {
                    distance: element.distance.text,
                    duration: element.duration.text
                }
            };
        } else if (element.status === 'ZERO_RESULTS') {
            return {
                success: false,
                error: 'No route found'
            };
        } else {
            return {
                success: false,
                error: 'Failed to get distance'
            }
        }
    } else {
        return {
            success: false,
            error: `API request failed with status: ${data.status}`
        }
    }

}

const getSuggestionsForAddress = async (address) => {
    if (!address) {
        return {
            success: false,
            error: 'Address is required'
        }
    }

    const API_KEY = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(address)}&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 'OK' && data.predictions) {
        const arr = data.predictions.map(prediction => ({
            description: prediction.description,
            placeId: prediction.place_id,
            mainText: prediction.structured_formatting?.main_text || '',
            secondaryText: prediction.structured_formatting?.secondary_text || ''
        }));
        return {
            success: true,
            data: arr
        };
    } else {
        return {
            success: false,
            error: `Failed to get suggestions: ${data.status}`
        }
    }
};
module.exports = { getLocationCoordinates, getDistanceBetweenLocation, getSuggestionsForAddress };
const axios = require('axios');

/**
 * Get weather info
 */
const _get_weather_info = async (longlat) => {
    try {
        const access_key = '475afd097ef4e962c1812ab02cdd2e97';
        const { current } = (await axios.get(`http://api.weatherstack.com/current?access_key=${access_key}&query=${longlat}`)).data;
        const { weather_descriptions, temperature, feelslike } = current;
        return `${weather_descriptions}. It is currently ${temperature}. it feels like ${feelslike} degrees out`;
    } catch (err) {
        console.log(err);
    };
}

/**
 * get location from mapbox
 * 
 * @returns {string}
 */
const _get_location = async (loc, callback) => {
    try {
        const access_key = 'pk.eyJ1IjoicmFkaWFudGNqdWFuIiwiYSI6ImNraGl2emZkZzBmbzQzNnNkNGFxeTloNG4ifQ.1oE3Jjqi0EH1Csu923sUNA';
        const { features } = (await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${loc}.json?access_token=${access_key}&limit=1`)).data
        const long_lat = features[0].center[1] + ',' + features[0].center[0];
        return callback(long_lat);
    } catch (err) {
        console.log(err.message);
    }
}

const getWeatherForcast = (location = 'manila') => {
    return _get_location(location, _get_weather_info);
}

module.exports = {
    getWeatherForcast: getWeatherForcast
}
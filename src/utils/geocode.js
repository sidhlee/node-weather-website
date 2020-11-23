const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2lkaGxlZSIsImEiOiJja2hqa2dlbzcxbW1lMnRwZjFjN254dXRjIn0.QJ9xpYOxeDNfPqtl-6lwAg&limit=1`;

  request({ url, json: true }, (error, { body: { features } = {} } = {}) => {
    if (error) {
      callback('Unable to connect to the geocoding service!');
    } else if (!features || features.length === 0) {
      callback('Unable to find location. Try another search.');
    } else {
      const {
        geometry: {
          coordinates: [lng, lat],
        },
        place_name,
      } = features[0];

      callback(null, {
        lat,
        lng,
        placeName: place_name,
      });
    }
  });
};

module.exports = geocode;

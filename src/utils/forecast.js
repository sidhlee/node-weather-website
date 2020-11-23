const request = require('postman-request'); // request is deprecated & maintained by postman team.

const forecast = (lat, lng, cb) => {
  // units=m for metric
  const url = `http://api.weatherstack.com/current?access_key=abb76f98293860a41b391cd7208a22b5&query=${lat},${lng}&units=m`;
  request(
    { url, json: true },
    (networkError, { body: { current, error: resError } = {} } = {}) => {
      if (networkError) {
        // this error obj only populates for low level errors like network error
        cb({ error: 'Unable to connect to weather service!' });
      } else if (resError) {
        console.log(resError);
        // Handle error sent by the server. It can be found under response.body
        cb({ error: 'Unable to find location' });
      } else {
        const data = {
          description: current.weather_descriptions[0],
          temperature: current.temperature,
          feelslike: current.feelslike,
        };
        cb(null, data);
      }
    }
  );
};

module.exports = forecast;

const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/fbdb51d1ef4d6fa42a0883df39edd055/${latitude},${longitude}`;

  request({ url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const temp = body.currently.temperature;
      const precip = body.currently.precipProbability;
      const summary = body.daily.data[0].summary;
      const tempHigh = body.daily.data[0].temperatureHigh;
      const tempLow = body.daily.data[0].temperatureLow;
      callback(undefined, `${summary} It is currently ${temp} degrees out. The high today will be ${tempHigh} degrees and the low will be ${tempLow} degrees. There is a ${precip}% chance of rain.`);
    }
  });
}

module.exports = forecast;
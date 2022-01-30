const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=16f786d3bfc5612301db19fcf406c72f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather[0].main +
          " It is currently " +
          body.current.temp +
          " degress out. There is a " +
          body.current.pressure +
          "pressure"
      );
    }
  });
};

module.exports = forecast;

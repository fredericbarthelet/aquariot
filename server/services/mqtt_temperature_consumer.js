'use strict';

var temperatureTopic = 'aquariot/temperature/+';
var app = require('../server');

module.exports = function (client) {
  client.on('message', function (topic, message) {
    var temperatureLog = {
      location: topic.substring(temperatureTopic.length-1,topic.length),
      value: parseFloat(message)
    };
    app.models.Temperature.create(temperatureLog, function(err, temperature) {
      if(err) {
        console.log(err);
      }
      console.log(temperature);
    })
  });
};

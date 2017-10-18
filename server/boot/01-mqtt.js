'use strict';

var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://mosquitto');
var temperatureTopic = 'aquariot/temperature/+';

module.exports = function (server) {
  client.on('connect', function () {
    client.subscribe(temperatureTopic);
  });

  client.on('message', function (topic, message) {
    var temperatureLog = {
      location: topic.substring(temperatureTopic.length-1,topic.length),
      value: parseFloat(message)
    };
    server.models.Temperature.create(temperatureLog, function(err, temperature) {
      if(err) {
        console.log(err);
      }
      console.log(temperature);
    })
  });
};

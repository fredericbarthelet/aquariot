'use strict';

var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://mosquitto');
var temperatureTopic = 'aquariot/temperature/+';
var mqttTemperatureConsumer = require('../services/mqtt_temperature_consumer');

module.exports = function (server) {
  client.on('connect', function () {
    client.subscribe(temperatureTopic);
  });

  mqttTemperatureConsumer(client);
};

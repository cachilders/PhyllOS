////////    NODE MODULES    ////////
var express = require('express');
var router  = express.Router();
var request = require('request');


var httpRequestOptions = {
  // CHANGE this line to API endpoint
  url: 'https://ancient-peak-18496.herokuapp.com/pong',
};

router.post('/', function(req, res){
  httpRequestOptions.sensorData = req.body;
  console.log('PING');
  console.log('Sensor Data:', req.body);
  request(httpRequestOptions, function(error, response, body){
    console.log("body:", body);
  })
})


module.exports = router;

////////    NODE MODULES    ////////
// var tessel  = require('tessel');
var request = require('request');
var app     = require('./server/server').app;



// PING server every three seconds
setInterval(function () {

  // SET HTTP request options
  var httpRequestOptions = {
    url: 'http://localhost:1991/ping',
    form: {
      sensorData: Math.random() * 10
    }
  };

  request.post(httpRequestOptions, function(error, response, body){
    console.log(body);
  })
}, 3000);


module.exports.app = app;

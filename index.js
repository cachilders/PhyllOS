////////    NODE MODULES    ////////
               require('dotenv-safe').load();
// var tessel  = require('tessel');
var request  = require('request');
var app      = require('./server/server').app;

// RETRIEVE unique device identifier
var deviceId;

require('getmac').getMac(function(err, mac) {
  if (err) throw err
  deviceId = mac;
});

// POST measurements every fifteen seconds
setInterval(function () {

  // SET HTTP request options
  var httpRequestOptions = {
    url: 'http://localhost:1991/post-data',
    form: { // dummy data with all available fields on server db
      status: {
      deviceId: deviceId, // key — create or retrieve record
      deviceOS: "shrug",  // update
      deviceAlert: false, // update
      moisture: "wet",    // push to array
      ph: "meh",          // push to array
      light: "bright",    // push to array
      humidity: "dry",    // push to array
      temperature: "hot", // push to array
      pressure: "severe", // push to array
      noise: "shh"        // push to array
      }
    }
  };

  request.post(httpRequestOptions, function(error, response, body){
    console.log(body);
  })
}, 15000);


module.exports.app = app;

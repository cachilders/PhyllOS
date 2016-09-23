////////    NODE MODULES    ////////
/* COMMENT line below when using Raspberry Pi */
var Tessel      = require("tessel-io");
var five        = require("johnny-five");
var request     = require('request');
var app         = require('./server/server').app;
var os          = require('os');
var getIp       = require('external-ip')();
var iplocation  = require('iplocation');


// INSTANTIATE new Johnny-five board
var board = new five.Board({
  io: new Tessel()
});

// INITIALIZE variables
var moistureData = [ ];
var deviceId = os.networkInterfaces().eth0[0].mac;
var ip;
var location = { };

// GET public IP address
getIP(function (err, ip) {
  if (err) {
    throw err;
  }
  ip = ip;
});

console.log("Hello, I'm Phyll")
console.log("Device ID:", deviceId);

// GET geo location
iplocation(ip, function(err, res) {
  location.lat      = res.lat;
  location.long     = res.long;
  location.zipcode  = res.zipcode;
})

// TODO: Below should be modularized and called once immediately and again
// with the interval. Or something. Still not sold on interval as our chron job.

// WHEN board ready state
board.on("ready", function() {
  // ASSIGN PIN 7 on PORT A to register data
  var soil = new five.Sensor("a7");

  // SAMPLE data
  setInterval(function() {
    moistureData.push(soil.value);
    // every five seconds
  }, 5000);

  // PING server every five minutes
  setInterval(function () {

    var moistureSample = moistureData.reduce(function(acc, val) {
      return [acc[0] + val, ++acc[1]];
    }, [0, 0]);

    // AVERAGE sample data
    moistureSample = moistureSample[0] / moistureSample[1];

    // ASSIGN sample array to empty array
    moistureData = [ ];

    // SET HTTP request options
    var httpRequestOptions = {
      url: 'http://localhost:1991/post-data',
      form: { // dummy data with all available fields on server db
        deviceId: deviceId.toString(), // key — create or retrieve record
        location: location,
        deviceOS: null,           // will update
        deviceAlert: false,       // will update
        moisture: moistureSample, // will push to array
        light: null,              // will push to array
        // ph: null,                 // will push to array
        // humidity: null,           // will push to array
        // temperature: null,        // will push to array
        // pressure: null,           // will push to array
        // noise: null               // will push to array
      }
    };

    console.log('SENDING REQUEST');
    request.post(httpRequestOptions, function(error, response, body){
      console.log('RESPONSE RECEIVED');
      console.log(body);
    })

  }, 300000);

});


module.exports.app = app;

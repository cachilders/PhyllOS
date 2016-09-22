////////    NODE MODULES    ////////
var express = require('express');
var router  = express.Router();
var request = require('request');


var httpRequestOptions = {
  // CHANGE this line to API endpoint
  url: 'process.env.POST_TO_ADDRESS',
};

router.post('/', function(req, res){
  httpRequestOptions.sensorData = req.body;
  console.log('Sending ', req.body.status);
  request(httpRequestOptions, function(error, response, body){
    console.log("response: ", body);
  })
})


module.exports = router;

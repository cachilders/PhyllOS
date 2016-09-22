////////    NODE MODULES    ////////
var express = require('express');
var router  = express.Router();
var request = require('request');


var httpRequestOptions = {
  // CHANGE this line to API endpoint
  url: 'http://phyll-dev.herokuapp.com/io/record'
};

router.post('/', function(req, res){
  httpRequestOptions.body = {status: req.body.status};
  console.log('Sending ', req.body);
  request.post(httpRequestOptions, function(error, response, body){
    console.log("response: ", body);
  })
})


module.exports = router;

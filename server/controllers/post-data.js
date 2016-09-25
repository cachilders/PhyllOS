////////    NODE MODULES    ////////
var express = require('express');
var router  = express.Router();
var request = require('request');


var httpRequestOptions = {
  url: 'http://phyll-dev.herokuapp.com/io/record',
  json: true
};

router.post('/', function(req, res){
  httpRequestOptions.body = {status: req.body};
  request.post(httpRequestOptions, function(error, response, body){
    res.send();
  })
})


module.exports = router;
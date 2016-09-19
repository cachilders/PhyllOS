////////    NODE MODULES    ////////
var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/', function(req, res){
  res.send('PONG');
});


module.exports = router;

////////    NODE MODULES    ////////
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser')

///////    SERVER MODULES    ///////
var ping = require('./controllers/ping');
var pong = require('./controllers/pong');


// MOUNT middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// MOUNT subapp routes
app.use('/ping', ping);
app.use('/pong', pong);

app.set('port', 1991);
app.listen(app.get('port'), function(req, res){
  console.log('Express app listening on port:', app.get('port'));
});


module.exports.app = app;

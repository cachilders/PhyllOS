var express = require('express');

var app = express();

var port = 9000;
app.listen(port);

app.use('/', (req, res) => {
  res.send( `His power level is over port: ${ port }`);
});

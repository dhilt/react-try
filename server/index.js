var express = require('express');
var app = express();
var port = 3003;

app.get('/api/test', function (req, res) {
  res.send('API server works!');
});

app.listen(port, function() {
  console.log('Hello, console! Listening on port ' + port + '...');
});
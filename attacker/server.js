var express = require('express');
var app     = express();

app.use(express.static(__dirname + '/public')) // lookups for static files

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
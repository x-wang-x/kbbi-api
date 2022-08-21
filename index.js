var express = require('express');
var app = express();
var fs = require("fs");
const r18 = require('./src/scrapper.js');

app.get('/search/:key', async (req, res) => {
    let data = await r18.search(req.params.key);
    res.send(data);
    console.log(data);
  });
  
var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
"use strict";

var express  = require('express');
var app      = express(); 						

app.use(express.static(__dirname + '/public')); 	

app.get('/api/current', function(req, res) {
			res.send("" + Date.now()); 
});

app.listen(3000);
console.log("App listening on port 8080");
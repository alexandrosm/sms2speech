var request = require('request');
var Lame = require('lame');
var Speaker = require('speaker');
var fs = require('fs');
var express = require('express')
var twilio = require('twilio')

var out = fs.openSync('./out.log', 'a');
var err = fs.openSync('./out_err.log', 'a');

var app = express();

app.listen(process.env.PORT);

app.get('/', function (req, res) {
    var url = 'http://translate.google.com/translate_tts?tl=en&q=' + encodeURIComponent(req.query.Body);
    request(url).pipe(new Lame.Decoder).pipe(new Speaker);

    var twiml = new twilio.TwimlResponse();
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

console.log("Hello from resin");


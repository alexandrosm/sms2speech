var request = require('request');
var Lame = require('lame');
var Speaker = require('speaker');
var fs = require('fs');
var spawn = require('child_process').spawn;
var express = require('express');
var twilio = require('twilio');

// set the volume of the sound out to a reasonable level
var out = fs.openSync('./out.log', 'a');
var err = fs.openSync('./out_err.log', 'a');
//var child = spawn('/usr/bin/sound_start', [], { detached: true, stdio: [ 'ignore', out, err ] });

var app = express();

app.get('/', function (req, res) {
    var url = 'http://translate.google.com/translate_tts?tl=en&q=' + encodeURIComponent(req.query.Body);
    request(url).pipe(new Lame.Decoder).pipe(new Speaker);

    var twiml = new twilio.TwimlResponse();
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

console.log("Hello from resin");

app.listen(8080);
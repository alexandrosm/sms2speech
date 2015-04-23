var request = require('request');
var Lame = require('lame');
var Speaker = require('speaker');
var fs = require('fs');
var express = require('express')
var twilio = require('twilio')

var out = fs.openSync('./out.log', 'a');
var err = fs.openSync('./out_err.log', 'a');

var app = express();

app.use(cli.middleware() );
app.listen(process.env.PORT);

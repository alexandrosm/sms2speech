var request = require('request');
var Lame = require('lame');
var Speaker = require('speaker');
var fs = require('fs');
var spawn = require('child_process').spawn;
var express = require('express')
var twilioAPI = require('twilio-api')

// set the volume of the sound out to a reasonable level
var out = fs.openSync('./out.log', 'a');
var err = fs.openSync('./out_err.log', 'a');
var child = spawn('/usr/bin/sound_start', [], { detached: true, stdio: [ 'ignore', out, err ] });

var app = express();
var cli = new twilioAPI.Client(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

var ngrok = require('ngrok');

ngrok.connect({
    authtoken: process.env.NGROK_AUTH_TOKEN,
    subdomain: 'resintwilio',
    port: process.env.PORT
}, function (err, url) {
    // https://susanna.ngrok.com -> 127.0.0.1:8080 with http auth required
    console.log(err, url)
});

app.use(cli.middleware() );
app.listen(process.env.PORT);

//Get a Twilio application and register it
cli.account.getApplication(process.env.TWILIO_APPLICATION_SID, function(err, app) {
    if(err) throw err;
    app.register();
    app.on('incomingSMSMessage', function(smsMessage) {
        var url = 'http://translate.google.com/translate_tts?tl=en&q=' + encodeURIComponent(smsMessage.Body);
        request(url).pipe(new Lame.Decoder).pipe(new Speaker);
    });
});

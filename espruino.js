var wifi = require('EspruinoWiFi');
var http = require('http');

var dryRun = false;

var leds = { red: LED1, green: LED2 };
var analogInput = A0;

var wifiName = 'YOUR-WIFI-SSID';
var wifiOptions = { password: 'YOUR-WIFI-PASSWORD' };

var notificationText = 'The doorbell is ringing!';
var secretSlackPath = 'SECRET-SLACK-PATH';

function connectWiFi(callback) {
  console.log('Connecting to WIFI...');
  wifi.connect(
    wifiName,
    wifiOptions,
    function(err) {
      if (err) {
        leds.red.write(true);
        console.log('WIFI Connection error: ' + err);
        return;
      }
      console.log('WIFI Connected!');
      leds.green.write(false);
      callback();
    }
  );
}

function watchLightSensor() {
  // expected values between 0.0 and 1.0
  var light = analogRead(analogInput);
  var nextCheckAfter = 100;
  var isLightCurrentlyOn = light > 0.5;

  // will help when testing the setup
  //console.log('Light:', light, ' isLightCurrentlyOn:', isLightCurrentlyOn);

  if (isLightCurrentlyOn) {
    nextCheckAfter = 8 * 1000;
    sendToSlackChannel();
  }

  leds.green.write(isLightCurrentlyOn);
  setTimeout(watchLightSensor, nextCheckAfter);
}

function sendToSlackChannel() {
  console.log('Notifying Slack Channel... (DryRun: ' + dryRun + ')');
  if (dryRun) return;

  var content = JSON.stringify({ text: notificationText });
  var options = {
    host: 'hooks.slack.com',
    port: '443',
    path: secretSlackPath,
    protocol: 'https:',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': content.length
    }
  };

  var request = http.request(options, function(res) {
    console.log('Connected to Slack');
    res.on('error', function(e) {
      leds.red.write(true);
      console.error('Could not notify Slack: ', e.code);
      console.error(e.message);
    });

    res.on('close', function(data) {
      console.log('Slack notification completed.');
    });
  });
  request.write(content);
  request.end();
}

function onStartup() {
  console.log('Starting up! (DryRun: ' + dryRun + ')');
  leds.green.write(true);
  leds.red.write(false);
  connectWiFi(watchLightSensor);
}

E.on('init', onStartup);

if (dryRun) {
  onStartup();
}

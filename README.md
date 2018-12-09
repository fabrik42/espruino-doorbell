# Espruino WiFi powered Slack Doorbell Notifier

This is a little project that uses a [Espruino WiFi](https://www.espruino.com/WiFi) to watch a LED with a [Light Dependent Resistor](https://www.espruino.com/LDR).

When the LED is lit up, the script will trigger a Slack bot to send a message to a specified channel.

The hardware setup is rather simple and [well documented on the offical Espruino page](https://www.espruino.com/Pico+Light+Sensor).

In order to send a message to Slack you need to setup your own [Slack app](https://api.slack.com/apps/) and configure an [Incoming Webhook](https://api.slack.com/apps/AE9PG2SHJ/incoming-webhooks).

# Motivation

The doorbell in our office is very hard to hear sometimes, especially if you are too far away from the intercom. But we can't change the doorbell system as it is part of the whole office building.

As a workaround this device watches the little LED that only lights up if the doorbell rings, as pictured below.

![The doorbell is ringing](https://media.giphy.com/media/oznDSPcmtjojYtE3bN/giphy.gif)

The device intercepts the light signal and converts it into a Slack message in our newly founded `#doorbell` channel.

This allows everyone who is interested to be notified by a Slack push message when the doorbell rings.

# Photos

## Wiring on a breadboard

![Wiring](https://i.imgur.com/ssRitIP.jpg)

## Initial Tryouts

![Initial tryout](https://i.imgur.com/qSzkCOF.jpg)

## First installation

![First installation](https://i.imgur.com/qa2YoPT.jpg)

Powered by a powerbank.

## Doorbell Bot in Action

![Doorbell Bot in Action](https://i.imgur.com/XNcCa6p.png)

On duty during a golang meetup in our offices :)

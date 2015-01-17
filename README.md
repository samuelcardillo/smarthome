# smarthome

## Introduction

Last Revision : 17 January 2015

SmartHome ([check the video](https://www.youtube.com/watch?v=0_fc6otGhpU)) is a service built for fun. This is the first version which allow you to add dynamically actions
and control any IoT devices who run at least one REST API service.

The first version was built in less than 5 hours using Polymer. Tests were made on Philips Hue.

## database.json

The file "database.json" contain all informations needed in order to make the system work properly. 
In order to add/edit actions, you just need to modify the JSON. 

Initial structure : 
...
{
  "trigger sentence":
  {
    "method": "PUT",
    "url": "http://xxx.xxx.xx.xx/api/",
    "body":"{\"on\":true}",
    "speech": {
      "onActivation": "Turning on the lights",
      "onError": "An error occured"
    }
  }
}
...

## TO DO :

Lot of improvments will come in few days in order to make the plateform smarter.


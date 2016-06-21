var exports   = module.exports = {}
  , request   = require('request')
  , moment    = require('moment')
  , smarthome = require('../api')
  , keywords  = [
      'weather',
      'Weather',
      'météo'
    ]
  , response  = {
      voice:  null,
      text:   null
    }

/** PUBLIC CALLS **/
exports.initiate = function(command,callback) {
  smarthome.commandContains(command.order,keywords,function(e){
    for(var k in e) { 
      if(!e[k]) continue;

      // Check the date (can work with yesterday, today & tomorrow)
      _checkDate(command.order,function(date){
        _checkWeather(command.coordinates,date.timestamp,function(output){
          var celsius = Math.round((output.temperature-32) * 5 / 9)
            , response  = {
                voice:  "The weather "+ date.text +" is " + output.summary,
                text:   "The weather "+ date.text +" is " + output.summary + " with around " + celsius + " celsius and " + output.humidity + " humidity"
              }

          return callback(response);
        })
      })
      
    }
  })
}

/** PRIVATE CALLS **/
_checkDate = function(command,callback) {
  var answer    = {
        text: "today",
        timestamp: moment().unix()
      }
    , _keywords = [
      "yesterday",
      "tomorrow",
      "today"
    ]

  smarthome.commandContains(command,_keywords,function(e){
    for(var k in e) {
      if(!e[k]) continue;

      if(k == "tomorrow") {
        answer.timestamp = moment().add(1, 'd').unix()
      } else if(k == "yesterday") {
        answer.timestamp = moment().subtract(1, 'd').unix()
      }

      // console.log(k);

      answer.text = k;

      return callback(answer);
    }
    
  })
}

_checkWeather = function(coordinates,timestamp,callback) {
  // console.log(timestamp);
  request("https://api.forecast.io/forecast/41918beaccca59d8b7c9897b71bc90e9/"+coordinates.lat+","+coordinates.lng+","+timestamp, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var body = JSON.parse(body);

      return callback(body.currently);
    }
  })
}
var exports   = module.exports = {}
  , request   = require('request')
  , smarthome = require('../api')
  , keywords  = [
      'weather',
      'météo'
    ]
  , response  = {
      voice:  null,
      text:   null
    }

exports.initiate = function(command,callback) {
  smarthome.commandContains(command.order,keywords,function(e){
    for(var k in e) { 
      if(!e[k]) continue;

      _checkDate(command,function(e){
        var celsius = Math.round((e.temperature-32) * 5 / 9)
          , response  = {
              voice:  "The weather today is " + e.summary,
              text:   "The weather today is " + e.summary + " with around " + celsius + " celsius and " + e.humidity + " humidity"
            }

        return callback(response);
      })
    }
  })
}

_checkDate = function(command,callback) {
  var _date         = new Date()
    , _coordinates  = command.coordinates

  request("https://api.forecast.io/forecast/41918beaccca59d8b7c9897b71bc90e9/"+_coordinates.lat+","+_coordinates.lng, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var body = JSON.parse(body);

      return callback(body.currently);
    }
  })
}
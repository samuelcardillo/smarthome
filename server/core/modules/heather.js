var exports   = module.exports = {}
  , request   = require('request')
  , smarthome = require('../api')
  , keywords  = [
      'heather',
      'heat',
      'chauffage',
      "allume"
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
      // _checkState(command.order,function(state){
      _blastIR(function(output){
        var response  = {
            voice:  "With pleasure sir",
            text:   "With pleasure sir"
          }

        return callback(response);
      })
      // })
      
    }
  })
}

/** PRIVATE CALLS **/
_checkState = function(command,callback) {
  var answer    = {
        text: "on"
      }
    , _keywords = [
      "on",
      "off"
    ]

  smarthome.commandContains(command,_keywords,function(e){
    for(var k in e) {
      if(!e[k]) continue;

      switch(k) {
        case "on":
          k = "on";
          break;
        case "off":
          k = "off";
          break;
      }

      answer.text = k;

      return callback(answer);
    }
    
  })
}

_blastIR = function(callback) {
  request("http://192.168.0.100/", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var body = body;
      return callback(true);
    }
  })
}
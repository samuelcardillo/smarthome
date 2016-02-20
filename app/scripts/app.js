(function(document) {
  'use strict';
  var app = document.querySelector('#app');

  app.commands = [];

  // Sets app default base URL
  app.baseUrl = '/';

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');

    // Voice recognition API
    app._startListening = function() {
      app.$.voiceRecognition.start();
    }

    app._voiceResult = function(e) {
      app._sendCommand(app.$.voiceRecognition.text,function(e){
        app.$.voiceRecognition.text = "";
        app.$.voiceRecognition.stop();
      }.bind(this));
    }

    app._voiceError = function(e) {
      console.dir(e);
    }

    // Iron Ajax
    app._handleResponse = function(e) {
      var _response = e.detail.response;

      this.unshift('commands',_response);

      app.$.voicePlayer.text = _response.answer.voice;
      app.$.voicePlayer.speak();
    }

    // Private calls
    app._repeatCommand = function(e) {
      app._sendCommand(e.model.item.request, function(){});
    }

    app._sendCommand = function(command, callback) {
      var order = {
        coordinates : {
          lat: app.lat,
          lng: app.lng
        },
        order : command
      }

      app.$.ironAjax.contentType  = "application/json";
      app.$.ironAjax.url          = "http://" + document.location.hostname + ":5445";
      app.$.ironAjax.body         = order;
      app.$.ironAjax.generateRequest();

      return callback(command);
    }
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
  });

})(document);

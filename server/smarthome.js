// Including and starting all inclusions
var express       = require("express")
  , path          = require('path')
  , app           = express()
  , bodyParser    = require('body-parser')
  , request       = require('request')
  , server        = require('http').createServer(app)

app.use('/app/bower_components', express.static(path.join(process.cwd(), 'bower_components')))
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json({limit: '2mb'}));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true,limit: '2mb'}));   // to support URL-encoded bodies

// GLOBAL VARIABLES
host      = {
    port:     5445
}
// GLOBAL VARIABLES

// ======================= START INITIALIZATION PROCESS ======================= //

console.log("######################################");
console.log("# SmartHome -  Version : 0.5");
console.log("# Bayit Project");
console.log("# By @cyberwarfighte1 (Samuel LESPES CARDILLO)");
console.log("######################################");
console.log("[I] Express server started on port " + host.port + " ...");
console.log("[I] Socket.IO server started on port " + host.port + "...");

server.listen(host.port);

// ======================= START EXPRESS.JS API ======================= //

var core = require('./core/main');

core.initiate();

app.use(function(req,res,next){
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT");
    next();
});

app.post('/',function(req,res){
  var response = {
    request: null,
    answer : {
      image: null,
      voice: null,
      text: null
    }
  }

  console.log("[I] New command : " + req.body.order);

  core.sendCommand(req.body, function(output) {
    response = {
      request: req.body.order,
      answer:  output
    }

    res.end(JSON.stringify(response));
  });
})



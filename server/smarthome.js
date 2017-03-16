// Including and starting all inclusions
var express       = require("express")
  , app           = express()
  , bodyParser    = require('body-parser')
  , path          = require('path')
  , request       = require('request')
  , program       = require('commander')
                      .version('0.0.1')
                      .option('-p, --port [value]', 'port')
                      .parse(process.argv)
  , serverPort    = program.port || 5446
  , server        = require('http').createServer(app).listen(serverPort)

app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json({limit: '2mb'}));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true,limit: '2mb'}));   // to support URL-encoded bodies
app.use(function(req,res,next){
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT");
    next();
});

// ======================= START INITIALIZATION PROCESS ======================= //

console.log("######################################");
console.log("# SmartHome -  Version : 0.5");
console.log("# Bayit Project");
console.log("# By @cyberwarfighte1 (Samuel LESPES CARDILLO)");
console.log("######################################");
console.log("[I] SmartHome started on port " + serverPort + " ...");

var core = require('./core/main');
core.initiate();

// ======================= START EXPRESS.JS API ======================= //



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

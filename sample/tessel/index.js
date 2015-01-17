/** 
 * PRIMARY TESSEL CALLS 
 **/ 
var tessel 		 = 		require('tessel');
var http		 =		require('http');
var climateData = {};

var httpServer = http.createServer(function(req, res){
  res.end(JSON.stringify(climateData));
});

httpServer.listen(1337);

/** TESSEL CLIMATE **/
var climatelib = require('climate-si7020');
var climate = climatelib.use(tessel.port['A']);

climate.on("ready",function(){
	console.log("Its connected");

	setImmediate(function loop(){
		climate.readTemperature('c',function(err,temp){
			climate.readHumidity(function(err,humid){
				climateData = {};

				climateData["temp"] = temp.toFixed(1);
				climateData["humid"] = humid.toFixed(1);
				setTimeout(loop,300);
			})
		})
	})
})
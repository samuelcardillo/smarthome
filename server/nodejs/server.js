/**
 * Module dependencies.
 **/
var request 	   =		require("request");
var express        =        require("express");
var bodyParser     =        require("body-parser");
var app            =        express();

/** 
 * 
 **/
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){
  	res.end("Hi ! I am a server <3");
});

app.post('/',function(req,res){
	var sentencesDb    = 		require("./sentences.json");
	var actionsDb      = 		require("./actions.json");
	var command = req.body.cmd;

	res.setHeader('Access-Control-Allow-Origin', '*');

	console.log("Received : "+command);
	if(!sentencesDb[command]) {
		console.log("[O] Command not recognized : "+command);
		res.end("Command not recognized");
		return false;
	}

	if(!actionsDb[sentencesDb[command]]) {
		console.log("[O] Request action doesnt exist.");
		res.end("Action doesn't exist");
		return false;
	}
	var action = actionsDb[sentencesDb[command]];

	request({
	    method: action.method,
	    preambleCRLF: true,
	    postambleCRLF: true,
	    uri: action.url,
	    body: action.body
	  },
	  function (error, response, body) {
	  	var answer = (!action.speech) ? body : action.speech.onSuccess;
	    if (error) {
	    	answer = (!action.speech) ? "An error occured" : action.speech.onError;
	      	console.log('[O] An error occured during the action.');
	      	res.end(answer);
	      	return false;
	    }

	    console.log('[I] Action done with success.');
	    res.end(answer);
  	})
});

app.listen(1337,function(){
  	console.log("Started on PORT 1337");
})
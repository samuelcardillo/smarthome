var exports = module.exports = {}
  , nlp           = require("nlp_compromise")
  , speak         = require("speakeasy-nlp")
  , modules       = [
      require('./modules/weather'),
      require('./modules/heather')
    ]

exports.initiate = function() {
  console.log('[I] There\'s ' + modules.length + ' modules loaded.');
}

exports.sendCommand = function(command,callback) {
  analyseSentence(command);
  for(var k in modules) {
    modules[k].initiate(command,function(output){
      return callback(output);
    });
  }
}

/** PRIVATE FUNCTIONS **/
  
function analyseSentence(sentence) {
  /**##########################
  |         VARIABLES
  ##########################**/
  var sentence_type = null;
  var sentence_nlp = nlp.sentence(sentence);

  /**##########################
  |         PROCEDURES
  ##########################**/
  
  sentence_type = get_sentence_type(sentence); // Checking the type of the sentence 👀
  sentence_geo = get_places(sentence); // Checking if the sentence contains a location 📌
}

function get_sentence_type(sentence) {
  var result = nlp.sentence(sentence.order).sentence_type(); // Initiate the standard NLP analyzer 👍
  var sentence_classified = speak.classify(expand_sentence(sentence.order)); // Classify through speak NLP
  var interrogative_keywords = ["what","where","why"];  // Identifying the interrogative keywords

  if(interrogative_keywords.indexOf(sentence_classified.action) >= 0) $result = "interrogative"; // Quick check

  return result; // Return the sentence type
}

function get_places(sentence) {
  var places = nlp.place(sentence);

  var geo = (places.city == null && places.region == null && places.country == null) ? false : true;
  
  return geo;
}

function expand_sentence(sentence) {
  analysedSentence = nlp.sentence(sentence)
  analysedSentence.contractions.expand();
  analysedSentence = analysedSentence.text();
  return analysedSentence;
}

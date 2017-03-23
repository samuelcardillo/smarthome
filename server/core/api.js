var exports = module.exports = {}

/** PUBLIC CALLS **/

exports.commandContains = function(command,needle,callback) {
  var response = null;

  if(typeof(needle) == "object") {
    searchInArray(command,needle,function(e){
      response = e;
    })
  } else {
    searchInString(command,needle,function(e){
      response = e;
    })
  }

  return callback(response);
}

/** PRIVATE CALLS **/
searchInArray = function(command,array,callback) {
  var response = {};

  for(var k in array) {
    response[array[k]] = (command.toLowerCase().indexOf(array[k]) == -1) ? false : true; 
  }

  return callback(response);
}

searchInString = function(command,string,callback) {
  return callback((command.indexOf(string) == -1) ? false : true); 
}



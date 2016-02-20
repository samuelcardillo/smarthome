var exports = module.exports = {}
  , modules = [
      require('./modules/weather'),
    ]

exports.initiate = function() {
  console.log('[I] There\'s ' + modules.length + ' modules loaded.');
}

exports.sendCommand = function(command,callback) {
  for(var k in modules) {
    modules[k].initiate(command,function(output){
      return callback(output);
    });
  }
}
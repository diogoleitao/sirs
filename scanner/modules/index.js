/**
	Tomás Pinho
	13:30 19/11/2014 
	This index.js file simply finds all available scan modules
	and populates the exports array with all requireJs objects
*/

exports = module.exports = [];
require('fs').readdirSync(__dirname + '/').forEach(function(file) {
  if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    exports[name] = require('./' + file);
  }
});
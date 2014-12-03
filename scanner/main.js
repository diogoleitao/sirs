/**
	Tomás Pinho
	13:30 19/11/2014 
	This is the main entry point for the scanner program present
	in this package.
*/

var utilities = require("./utilities/");

/* Setting up reading from stdin */
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false //so we get terminal pipe support
});

/* Reading urls from stdin and storing */
var urls = [];
rl.on('line', function (url) {
	urls.push(url);
});
rl.on('close', function(){

/* Setting up available scan modules */
var scanModules = require('./modules/');
console.log("Available scan modules: " + utilities.objectToCommaSeparatedString(scanModules));

/* Running all available modules for all available urls */
urls.forEach(function(url, urlIndex, urls){
	console.log("Scanning url: " + url + " with " + Object.keys(scanModules).length + " modules.");
	for(var moduleName in scanModules){
		console.log(scanModules[moduleName].run(url));
	}
});

});
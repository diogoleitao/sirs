/**
	Tomás Pinho
	13:30 19/11/2014 
	This is the main entry point for the scanner program present
	in this package.
*/

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

/* Printing available scan modules */
var listModules = "";
Object.keys(scanModules).forEach(function(moduleName, moduleNameIndex, moduleNames){
	listModules += moduleName + ", ";
});

listModules = listModules.slice(0, listModules.length - 2); //cutting out trailing ', '

console.log("Available scan modules: " + listModules);

/* Running all available modules for all available urls */
urls.forEach(function(url, urlIndex, urls){
	console.log("Scanning url: " + url);
	scanModules.forEach(function(module,moduleIndex,modules){
		module.run(url);
	});
});

process.exit();
});
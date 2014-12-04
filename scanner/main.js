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
console.log("If vulnerabilities are found, we recommend the reading of these great articles by OWASP:");
console.log("SQL Injection Prevention: https://www.owasp.org/index.php/SQL_Injection_Prevention_Cheat_Sheet");
console.log("XSS Prevention: https://www.owasp.org/index.php/XSS_%28Cross_Site_Scripting%29_Prevention_Cheat_Sheet");
console.log("SSI Prevention: https://www.owasp.org/index.php/Server-Side_Includes_%28SSI%29_Injection");
/* Running all available modules for all available urls */
urls.forEach(function(url, urlIndex, urls){
	for(var moduleName in scanModules){
		scanModules[moduleName].run(url);
	}
});

});

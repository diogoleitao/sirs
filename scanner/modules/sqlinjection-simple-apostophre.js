/**
	Tomás Pinho
	21:12 29/11/2014 
	This module serves as a non-sophisticated test for sql injection on a given url.
	Tests sql injection vulnerabilities by passing in an apostophre in all get variables
	present in the url each at a time. Supports MySQL and MSSQL
*/
var Url = require("url");
var request = require('sync-request');
var utilities = require("../utilities/");
module.exports = {
	run: function(url){
		var injectableVars = [];
		// Parsing the url and the queryString arguments
		var urlObject = Url.parse(url, true);
		Object.keys(urlObject.query).forEach(function(varName){
			// Appending an apostophre (url escaped) to hopefully trigger a syntax error
			urlObject.query[varName] += "'";
			// Forcing update of final url
			delete urlObject.search;
			//console.log(urlObject.format());
			
			// Making the request
			var res = request('GET', urlObject.format());
			if(res.statusCode == 200){
				// Checking for the string stating there was an error in MySQL syntax
	  			if(res.getBody().toString().toLowerCase().indexOf("You have an error in your SQL syntax".toLowerCase()) > -1){
					injectableVars.push(varName);
				}
				// Checking for the string stating there was an error in MSSQL syntax
				if(res.getBody().toString().toLowerCase().indexOf("Microsoft OLE DB Provider for ODBC Drivers".toLowerCase()) > -1){
					injectableVars.push(varName);
				}
			} else if(res.statusCode == 500){
				// A MySQL syntax error may often trigger a 500 internal server error status code
				injectableVars.push(varName);
			}
			// This can't really handle other weird status codes

			// Cleaning up the modifications made to variable
			urlObject = Url.parse(url, true);
		});
		
		if(injectableVars.length == 0){
			console.log(url + " - SQL Injection Simple Apostrophe module: SQL Injection does not seem to be possible."); 
		} else {
			console.log(url + " - SQL Injection Simple Apostrophe module: SQL Injection seems to be possible in variable(s): " + utilities.arrayToCommaSeparatedString(injectableVars)); 
		}		
	}
}

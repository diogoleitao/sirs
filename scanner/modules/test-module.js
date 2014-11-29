/**
	Tomás Pinho
	13:33 19/11/2014 
	This test module serves as a general purpose loaded test module
	for the scanner. Only prints passed urls.
*/

/** 
	All test modules are an object containing a single run function
	that receives a url to be scanned and returns a test result string
	for simplicity purposes. 
*/
module.exports = {
	run: function(url){
		return "Test scan module: run against target url.";
	}
}
/**
	Tomás Pinho
	13:33 19/11/2014 
	This test module serves as a general purpose loaded test module
	for the scanner. Only prints passed urls.
*/

/** 
	All modules are objects containing a single run function
	that receives a url to be scanned and print a result string
	for simplicity purposes. 
*/
module.exports = {
	run: function(url){
		console.log(url + " - Test scan module: ran.");
	}
}

/*
	Diogo Leitão
	22:16 30/11/2014 
	This modules simulates a SSI (server side includes) attack. It looks for the robots.txt file
*/
var Url = require("url");
var request = require('request');
module.exports = {
	run: function (url) {
		// Parsing the url and the queryString arguments
		var urlObject = Url.parse(url, true);
		Object.keys(urlObject.query).forEach(function (varName) {
			var tries = 5;
			// Making the request
			var robots = "robots.txt";
			for (var i = 0; i < tries; i++) {
				// Appending robots.txt, default file for crawlers to ignore certain directories
				urlObject.query[varName] = robots;
				// Forcing update of final url
				delete urlObject.search;
				request({url: urlObject.format()}, function (err,httpResponse,body) {
					if (httpResponse.statusCode == 200) {
						if(body.toLowerCase().indexOf("example file".toLowerCase()) > -1){
							console.log(url + " - SSI 'show robots.txt' Module: seems to be vulnerable to SSI attacks on variable " + varName);
						}
					}
				});
				robots = '../' + robots;
			}
			// Cleaning up modifications to URL
			urlObject = Url.parse(url, true);		
		});
	}
}

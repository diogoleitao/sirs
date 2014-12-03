/**
	Tomás Pinho
	21:12 29/11/2014 
	This module serves as a non-sophisticated test for sql injection on a given url.
	Tests sql injection vulnerabilities by passing in an apostophre in all get variables
	present in the url each at a time. Supports MySQL and MSSQL
*/
var Url = require("url");
var request = require('request');
//require('request-debug')(request);
var cheerio = require("cheerio");
var utilities = require("../utilities/");
module.exports = {
	run: function (url) {
		var injectableForms = [];

		// Parsing the url and the queryString arguments
		var urlObject = Url.parse(url, true);

		// Get correspondent page		
		request.get(urlObject.format(), function(err,httpResponse,body){
			var $;
			if(httpResponse.statusCode == 200){
			// Get all forms in page via CSS selector powered by Cheerio
			$ = cheerio.load(body);
			var forms = $("form");

			// Iterate through all forms and test them individually
			forms.each(function (index, form) {
				
				var action = $(this).attr("action");
				var method = $(this).attr("method") || "GET";
				var inputs = $(this).children(":input");
				var actionUrlObject = Url.resolve(urlObject.format(), action);
				// Iterate through all inputs and test them individually
				var inputsArray = inputs.toArray();
				inputsArray.forEach(function(index, testingInput){
					var testingInputName = $(inputsArray[testingInput]).attr("name");

					var javaScript = "<script type='text/javascript'>alert('xss test');</script>";
					var form = {};
					for(var input in inputsArray){
						var inject = $(inputsArray[input]).attr("name") == testingInputName; 
						form[$(inputsArray[input]).attr("name")] = (inject ? javaScript : ($(inputsArray[input]).val() == "" || $(inputsArray[input]).val() == undefined ? "default" : $(inputsArray[input]).val()));
					}
					if(method == "GET"){
						var actionWithQuery = actionUrlObject + "?" + require('querystring').stringify(form);
						request({url: actionWithQuery}, function(err,httpResponse,body){
							if(body.toLowerCase().indexOf("<script type='text/javascript'>alert('xss test');</script>".toLowerCase()) > -1){
								if(!err){
									console.log("XSS Simple Alert Module: Input with name " + testingInputName + " seems to be vulnerable to XSS Injection");
								} else {
									console.log("XSS Simple Alert Module: Testing input with name " + testingInputName + " caused error " + err + " on the server");
								}
							}
						});
					} else {
						request.post({url: actionUrlObject, form: form}, function(err,httpResponse,body){
							if(body.toLowerCase().indexOf("<script type='text/javascript'>alert('xss test');</script>".toLowerCase()) > -1){
								if(!err){
									console.log("XSS Simple Alert Module: Input with name " + testingInputName + " seems to be vulnerable to XSS Injection");
								} else {
									console.log("XSS Simple Alert Module: Testing input with name " + testingInputName + " caused error " + err + " on the server");
								}
							}
						});
					}
				});
			});
		}

		});
	}
}
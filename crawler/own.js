/**
	Tomás Pinho
	11:09 2/12/2014 
	This file is the main entry point for our own implementation of a webpage crawler based solely
	on links represented as anchor tag href attributes.
*/
var Url = require("url");
var request = require('request');
var cheerio = require("cheerio");
var async = require("async");
//var utilities = require("../utilities/");

var visited = [];
var maximumPages = 100;

/* Read initial URL and insert in the set of pages to visit and read the
 maximum of pages to crawl */
var entryUrl = process.argv[2];
entryUrl = Url.parse(entryUrl);
maximumPages = process.argv[3] || maximumPages;
maximumPages = parseInt(maximumPages);

var queue = async.queue(function crawl(url, next) {
	/* If we haven't seen the page to visit and we still haven't 
	reached the maximum number of pages, we crawl */
	if (Object.keys(visited).length >= maximumPages || visited[url]) return next(null);
	// We parse the url just to make sure everything is ok
	var urlObject = Url.parse(url, true);
	if(urlObject.host == entryUrl.host){
		// We make the request
		request({ uri: urlObject.format(), followRedirect: false }, function (error, response, body) {
	 			if (!error && response.statusCode == 200) {
	   				// We make the DOM ready
					$ = cheerio.load(body.toString());
			
					// Get all anchor tags
					var anchorTags = $("a");

					/* For all anchor tags, grab the link and mark for visit in the feature
					or don't, if we already have it visited */
					anchorTags.each(function(index, anchortag){
						var link = $(this).attr("href");
						link = Url.resolve(entryUrl.format(), link);
						queue.push(link);
					});

					// Get all form tags
					var formTags = $("form");

					/* For all form tags, grab the action link and mark for visit in the feature
					or don't, if we already have it visited */
					formTags.each(function(index, formtag){
						var action = $(this).attr("action");
						action = Url.resolve(entryUrl.format(), action);
						queue.push(action);
					});
					visited[urlObject.format()] = true;
	 			}
	 			next(null);
		});
	} else {
		next(null);
	}	
	}, 1);

queue.push(entryUrl.format());
queue.drain = function(){
	// Output all visited pages
	for(var link in visited){
		console.log(link);
	}
	//console.log(Object.keys(result).length)
};

	/*
	if(!hasPrinted && toVisit.length == 0){
		hasPrinted = true;*/

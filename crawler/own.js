/**
	Tomás Pinho
	11:09 2/12/2014 
	This file is the main entry point for our own implementation of a webpage crawler based solely
	on links represented as anchor tag href attributes.
*/
var Url = require("url");
var request = require('sync-request');
var cheerio = require("cheerio");
//var utilities = require("../utilities/");

var markedToVisit = [];
var toVisit = [];
var result = [];
var maximumPages = 100;

/* Read initial URL and insert in the set of pages to visit and read the
 maximum of pages to crawl */
var entryUrl = process.argv[2];
entryUrl = Url.parse(entryUrl);
toVisit.push(entryUrl.format());
maximumPages = process.argv[3] || maximumPages;
maximumPages = parseInt(maximumPages);
/* While we still have pages to visit or we have reached the maximum 
   number of pages, we crawl */
while(toVisit.length != 0 && Object.keys(result).length < maximumPages){
	var url = toVisit.pop();
	// We parse the url just to make sure everything is ok
	var urlObject = Url.parse(url, true);
	if(urlObject.host == entryUrl.host){
		// We make the request
		var res = request('GET', urlObject.format());
		if(res.statusCode == 200){
			// We make the DOM ready
			$ = cheerio.load(res.getBody().toString());
			
			// Get all anchor tags
			var anchorTags = $("a");

			/* For all anchor tags, grab the link and mark for visit in the feature
			or don't, if we already have it visited */
			anchorTags.each(function(index, anchortag){
				var link = $(this).attr("href");
				link = Url.resolve(entryUrl.format(), link);
				if(markedToVisit[link] != true){
					toVisit.push(link);
					markedToVisit[link] = true;
				}
			});
		}
		result.push(urlObject.format());
	}
}

// Output all visited pages
for(var link in result){
	console.log(result[link]);
}
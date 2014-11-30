//PhantomJS http://phantomjs.org/ based web crawler Anton Ivanov anton.al.ivanov@gmail.com 2012
//UPDATE: This gist has been made into a Node.js module and now can be installed with "npm install js-crawler"
//the Node.js version does not use Phantom.JS, but the API available to the client is similar to the present gist
var args = require('system').args;
var address = args[1];

(function(host) {

    function Crawler() {
        this.visitedURLs = {};
        this.onQueue = {}
    };
    
    Crawler.webpage = require('webpage');

    Crawler.prototype.crawl = function (url, depth, onSuccess, onFailure) {
        if (0 == depth || this.visitedURLs[url]) {
            function exit(code) {
                if (page) page.close();
                    setTimeout(function(){ phantom.exit(code); }, 0);
                //phantom.onError = function(){};
                //throw new Error('');
            }
           // return;
        };

        var self = this;
        var page = Crawler.webpage.create();

        page.open(url, function (status) {
            if ('fail' === status) { 
                onFailure({
                    url: url, 
                    status: status
                });
            } else {
                var documentHTML = page.evaluate(function () {
                    return document.body && document.body.innerHTML ? document.body.innerHTML : "";
                });
                self.crawlURLs(self.getAllURLs(page), depth - 1, onSuccess, onFailure);
                self.visitedURLs[url] = true;
                onSuccess({
                    url: url,
                    status: status,
                    content: documentHTML
                });
            };
        });

    //phantom.exit();
    };


    Crawler.prototype.getAllURLs = function(page) {
        return page.evaluate(function () {
            return Array.prototype.slice.call(document.querySelectorAll("a"), 0)
                .map(function (link) {
                    return link.getAttribute("href");
                });
        });
        page.close();
    };


Crawler.prototype.crawlURLs = function(urls, depth, onSuccess, onFailure) {
        var self = this;
       urls.forEach(function (url) {
            if(!(0 == url.indexOf("http")))
                url = address + "/" + url;
            if (self.onQueue[url]){
                return;
            }
            else{
                self.onQueue[url] = true;
                self.crawl(url, depth, onSuccess, onFailure);
            }
        });
    };

    host.Crawler = Crawler;

})(phantom);

new phantom.Crawler().crawl(address, 2, 
    function onSuccess(page) {
        console.log(page.url);
    }, 
    function onFailure(page) {
        console.log("Could not load page. URL = " +  page.url );
    }
);

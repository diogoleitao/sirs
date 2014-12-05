#!/bin/bash
# Run this script with the website to crawl as an argument and the Sirs.js will index and scan it
echo Checking/Installing dependencies
npm install
mkdir results
echo Indexing website
node crawler/own.js http://testphp.vulnweb.com/ 50 > results/index
#node crawler/own.js http://web.ist.utl.pt/ist173214/ 50 > results/index
echo Scanning website
# We sort the output so the results are printed organized - NodeJS is an async utility
node scanner/main.js < results/index | sort

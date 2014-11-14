#!/bin/bash
# Run this script with the website to crawl as an argument and the Sirs.js will index and scan it
echo Checking/Installing dependencies
npm install
mkdir results
echo Indexing website
node crawler/main.js > results/index
echo Scanning website
node scanner/main.js < results/index

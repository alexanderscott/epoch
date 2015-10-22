"use strict";

var copypaste = require('copy-paste'),
  commander = require('commander'),
  path = require('path'),
  packageJson = require(path.join(__dirname, '..', 'package.json'));

commander
  .version(packageJson.version)
  .usage('[options]') 
  .option('--seconds', 'Return seconds since epoch')
  .parse(process.argv);

function clipboardCopy(text, cb) { 
  copypaste.copy(text, cb); 
}

function millisSinceEpoch() {
  return new Date().getTime();
}

function secondsSinceEpoch() {
  return Math.round(millisSinceEpoch() / 1000);
}

var epochVal;
if (commander.seconds) {
  epochVal = secondsSinceEpoch();
} else {
  epochVal = millisSinceEpoch();
}

clipboardCopy(epochVal, function(err, copied) {
  console.log("Copied " + copied + " to clipboard");
});

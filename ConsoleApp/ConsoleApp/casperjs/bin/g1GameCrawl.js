"use strict";

var $ = require('jquery.js');
var casper = require('casper').create({
    pageSettings: {
        loadImages: false,        // The WebPage instance used by Casper will
        loadPlugins: true         // use these settings
    },
    logLevel: "info",              // Only "info" level messages will be logged
    verbose: true,
    viewportSize: {
        width: 1920,
        height: 1080
    },
    
});
var x = require('casper').selectXPath;
var fs = require('fs');

var tempPath;
var captureSreen = false;
var fileData;

var screenshot = function () {
    var oDate = new Date();
    var timestamp = oDate.getDate().toString() +
        oDate.getDay().toString() +
        oDate.getFullYear().toString() +
        oDate.getHours().toString() +
        oDate.getMinutes().toString() +
        oDate.getSeconds().toString() + "-" +
        oDate.getMilliseconds().toString();
    if (captureSreen) {

        casper.then(function () {
            this.capture(tempPath + "screenshots/" + timestamp + ".png");
        });
    }
};

var log = function (value) {

    console.log("_______________________________________");
    console.log("");
    console.log(value);
    console.log("_______________________________________");
};


 

casper.start('https://g1.globo.com/pop-arte/games/', function() {
 

    captureSreen = this.cli.get(0);
    tempPath = this.cli.get(1);
    fileData = this.cli.get(2);

    log(this.getTitle());

    var json = this.evaluate(function () {
        var $rows = document.querySelectorAll('.bastian-feed-item');
        var data = [];
        for (var i = 0, len = $rows.length; i < len; i++) {
            var line = $rows[i].querySelector('a').innerText;
            line += " - " + $rows[i].querySelector('.feed-post-body-resumo').innerText;
            data.push(line.replace(/\n/g, ' '));
        }
        return data;
    });

    log(json);

    fs.write(fileData, JSON.stringify(json), 'w');

});
casper.then(function () {
    this.exit(1);
});
casper.run();

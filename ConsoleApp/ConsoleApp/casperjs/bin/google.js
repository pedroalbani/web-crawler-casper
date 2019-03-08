"use strict";

var $ = require('jquery.js');
var casper = require('casper').create({
    pageSettings: {
        loadImages: false,        // The WebPage instance used by Casper will
        loadPlugins: true         // use these settings
    },
    logLevel: "info",              // Only "info" level messages will be logged
    verbose: true


});
var x = require('casper').selectXPath;
var fs = require('fs');

var links;
var userName;
var userPass;
var tempPath;
var filePath;
var captureSreen = false;

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

casper.start("https://cpq.mitel.com/plan/userManagement/showOwnSavedFiles");
casper.then(function () {
    screenshot();
    userName = this.cli.get(0);
    userPass = this.cli.get(1);
    captureSreen = this.cli.get(2);
    tempPath = this.cli.get(3);
    filePath = this.cli.get(4);
    this.clickLabel('Login', 'a');
});
casper.then(function login() {
    screenshot();
    this.clickLabel('Mitel MiAccess Login', 'a');

    this.waitForSelector("#j_username",
        function pass() {
            log("Found #j_username");
        },
        function fail() {
            log("Did not load element #j_username");
        },
        10000 // timeout limit in milliseconds
    );
});
casper.then(function () {
    screenshot();
    this.sendKeys('#j_username', userName);
    this.sendKeys('#j_password', userPass);
    this.thenClick('input[type=submit]');

    this.waitForSelector("#sapCustomerSelectId",
        function pass() {
            log("Found #sapCustomerSelectId");
        },
        function fail() {
            log("Did not load element #sapCustomerSelectId");
        },
        10000
    );

});
casper.then(function () {
    screenshot();
    this.click(x('//span[text()="Saved Files"]'));

    this.waitForSelector(".FormattedTableFirstColNoPad",
        function pass() {
            log("Found .FormattedTableFirstColNoPad");
        },
        function fail() {
            log("Did not load element .FormattedTableFirstColNoPad");
        },
        10000 // timeout limit in milliseconds;
    );

});
casper.then(function () {
    screenshot();
    links = this.evaluate(function () {
        var $rows = document.querySelectorAll("#negotContainer table tbody tr");

        var data = [];
        for (var i = 0, len = $rows.length; i < len; i++) {
            if ($rows[i].querySelectorAll('td')[0].className.toString() === "FormattedTableFirstColNoPad") {

                var name;
                var xls;

                var error = "none";
                try {
                    name = $rows[i].cells[0].querySelectorAll('a')[0].innerText + ".xls";
                    xls = $rows[i].cells[7].querySelectorAll('a')[0].href;
                }
                catch (e) {
                    error = e;
                }

                data.push({
                    name: name,
                    xls: xls,
                    error: error
                });

            }


        }

        return data;
    });

    fs.write(filePath, JSON.stringify(links), 'w');

    log(links);
});
casper.then(function () {
    screenshot();
    var count = 1;
    links.forEach(function (link) {
        log(link.xls);
        casper.download(link.xls, tempPath + "downloads/" + link.name);
    });

});
casper.then(function () {
    this.exit(1);
});
casper.run();

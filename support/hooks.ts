import { browser, protractor } from 'protractor';
import * as fs from 'fs';
import { defineSupportCode } from "cucumber";
import * as reporter from 'cucumber-html-reporter';
import { mkdirp } from 'mkdirp';

const Cucumber = require('cucumber');
const report = require('cucumber-html-report');

defineSupportCode(function ({ registerHandler, registerListener, After, setDefaultTimeout }) {
    setDefaultTimeout(60 * 1000);
    let jsonReports = process.cwd() + "/reports/json";
    let htmlReports = process.cwd() + "/reports/html";
    let screenshots = process.cwd() + "/reports/screenshots";
    let mustacheReports = process.cwd() + "/reports/mustache";
    let targetJson = jsonReports + "/cucumber_report.json";

    registerHandler('BeforeFeatures', async function () {
        await browser.getCapabilities().then(function (browserCapabilities) {
            console.log("Browser name is: " + browserCapabilities.get('browserName'));
            console.log("Browser version is: " + browserCapabilities.get('version'));
            console.log("Browser version is: " + browserCapabilities.get('platform'));
        });

        // let origFn = browser.driver.controlFlow().execute;
        //
        // browser.driver.controlFlow().execute = function() {
        //     let args = arguments;
        //
        //     // queue 100ms wait
        //     origFn.call(browser.driver.controlFlow(), function() {
        //         return protractor.promise.delayed(100);
        //     });
        //
        //     return origFn.apply(browser.driver.controlFlow(), args);
        // };
    });

    After(async function (scenarioResult) {
        let world = this;
        if (scenarioResult.isFailed()) {
            let screenShot = await browser.takeScreenshot();
            // screenShot is a base-64 encoded PNG
            world.attach(screenShot, 'image/png');
        }
    });

    let cucumberReporterOptions = {
        theme: "bootstrap",
        jsonFile: targetJson,
        output: htmlReports + "/cucumber_reporter.html",
        reportSuiteAsScenarios: true,
        launchReport: false,
        storeScreenshots: false,
        screenshotsDirectory: screenshots
    };

    let logFn = string => {
        if (!fs.existsSync(jsonReports)) {
            mkdirp.sync(jsonReports);
        }
        try {
            fs.writeFileSync(targetJson, string);
            reporter.generate(cucumberReporterOptions); // invoke cucumber-html-reporter

            report.create({
                source:       './reports/json/cucumber_report.json',  // source json
                dest:         './reports/mustache',                   // target directory (will create if not exists)
                name:         'mustache_report.html'                  // report file name (will be index.html if not exists)
            })
                .then(console.log)
                .catch(console.error);

        } catch (err) {
            if (err) {
                console.log(`Failed to save cucumber test results to json file. 
                             Failed to create html report.`);
                console.log(err);
            }
        }
    };
    let jsonformatter = new Cucumber.JsonFormatter({
        log: logFn
    });
    registerListener(jsonformatter);
});
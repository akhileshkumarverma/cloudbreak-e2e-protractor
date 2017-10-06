const Cucumber = require('cucumber');
import { browser, protractor } from 'protractor';
import * as fs from 'fs';
import { defineSupportCode } from "cucumber";
import * as reporter from 'cucumber-html-reporter';
import { mkdirp } from 'mkdirp';

defineSupportCode(function ({ registerHandler, registerListener, After, setDefaultTimeout }) {
    setDefaultTimeout(60 * 1000);
    let jsonReports = process.cwd() + "/reports/json";
    let htmlReports = process.cwd() + "/reports/html";
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
        reportSuiteAsScenarios: true
    };

    let logFn = string => {
        if (!fs.existsSync(jsonReports)) {
            mkdirp.sync(jsonReports);
        }
        try {
            fs.writeFileSync(targetJson, string);
            reporter.generate(cucumberReporterOptions); // invoke cucumber-html-reporter
        } catch (err) {
            if (err) {
                console.log(`Failed to save cucumber test results to json file. 
                             Failed to create html report.
                             `);
                console.log(err);
            }
        }
    };
    let jsonformatter = new Cucumber.JsonFormatter({
        log: logFn
    });
    registerListener(jsonformatter);
});
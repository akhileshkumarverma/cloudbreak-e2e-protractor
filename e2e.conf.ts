import { Config } from 'protractor';

export let config: Config = {
    directConnect: true,

    capabilities: {
        browserName: 'firefox',
        marionette: false
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        '../features/login.feature',
        '../features/dashboard.feature'
    ],

    /**
     * Base URL for the Cloudbreak.
     * BASE_URL is environment variable.
     */
    baseUrl: process.env.BASE_URL,

    onPrepare: () => {
        let globals = require('protractor');
        let browser = globals.browser;

        console.log("The Base URL is: " + process.env.BASE_URL);
        console.log("The Username is: " + process.env.USERNAME);
        console.log("The Password is: " + process.env.PASSWORD);

        /**
         * Open the base URL that defined above.
         * OR
         * You can use parameter 'browser.params.baseUrl' with 'protractor e2e.conf.js --params.baseUrl=https://123.12.123.12:3000/'.
         */
        browser.driver.get(browser.baseUrl);

        // https://github.com/angular/protractor/issues/3009
        //browser.executeScript('window.name = "NG_ENABLE_DEBUG_INFO!"');
        // https://github.com/angular/protractor/issues/3611
        //browser.ignoreSynchronization = true; - This property is deprecated - please use waitForAngularEnabled instead.
        browser.waitForAngularEnabled(false);

        // WebDriver general settings for browsers.
        browser.manage().deleteAllCookies();
        // https://github.com/angular/protractor/issues/1467
        browser.manage().window().setSize(1280, 1024);
        //browser.driver.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(20000);
        browser.manage().timeouts().pageLoadTimeout(60000);

        browser.getCapabilities().then(function (browserCapabilities) {
            console.log("Browser name is: " + browserCapabilities.get('browserName'));
            console.log("Browser version is: " + browserCapabilities.get('version'));
            console.log("Browser version is: " + browserCapabilities.get('platform'));
        });
    },
    cucumberOpts: {
        compiler: "ts:ts-node/register",
        strict: true,
        format: ['pretty'],
        require: ['../stepdefinitions/*/*.ts', '../support/*.ts'],
        tags: '@TypeScriptScenario or @CucumberScenario or @ProtractorScenario'
    }
};
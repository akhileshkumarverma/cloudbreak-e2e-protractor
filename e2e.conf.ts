import { Config } from 'protractor';

export let config: Config = {
    directConnect: true,

    capabilities: {
        browserName: 'firefox',
        marionette: false,
        idleTimeout: 120
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        '../features/login.feature',
        '../features/credential.feature',
        '../features/cluster.feature',
        '../features/logout.feature'
    ],

    /**
     * Base URL for the Cloudbreak.
     * BASE_URL is environment variable.
     */
    baseUrl: process.env.BASE_URL,

    allScriptsTimeout: 60000,
    getPageTimeout: 60000,
    ScriptTimeoutError: 60000,

    /**
     * https://github.com/angular/protractor/blob/2bde92b3e745e09ad3876932b2d187365e9aaa31/spec/angular2Conf.js
     *
     * Special option for Angular2, to test against all Angular2 applications on the page.
     * This means that Protractor will wait for every app to be stable before each action, and search within all apps when finding elements.
     */
    useAllAngular2AppRoots: true,

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
    },
    cucumberOpts: {
        compiler: "ts:ts-node/register",
        strict: true,
        format: [
            'pretty'
        ],
        backtrace: true,
        require: [
            '../stepdefinitions/*/*.ts',
            '../support/*.ts'
        ],
        tags: '@LoginScenario or @CredentialScenario or @ClusterScenario or @LogoutScenario'
    }
};
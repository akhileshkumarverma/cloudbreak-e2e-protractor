import { Config } from 'protractor';

export let config: Config = {
    params: {
        nameTag: process.env.TARGET_CBD_VERSION.replace(/\./g,'')
    },
    plugins: [{
        path: '../node_modules/protractor-console',
        package: 'protractor-console',
        logLevels: ['severe']
    }],

    troubleshoot: true,

    directConnect: true,
    capabilities: {
        /**
         * https://github.com/angular/protractor/blob/master/docs/browser-support.md
         * recommend testing against FireFox 47
         * in case of Firefox testing the: ["protractor": "5.0.0",] should be in package.json.
         */
        browserName: (process.env.BROWSER || 'firefox'),

        marionette: true,
        /**
         * Headless Firefox
         * https://github.com/mozilla/geckodriver/blob/master/README.md#capabilities-example
         */
        // alwaysMatch: {
        //     'moz:firefoxOptions': {
        //         'args': ['-headless'],
        //         'prefs': {
        //             'dom.ipc.processCount': 8
        //         },
        //         'log': {
        //             'level': 'trace'
        //         }
        //     }
        // },

        /**
         * Using headless Chrome
         * https://github.com/angular/protractor/blob/master/docs/browser-setup.md#using-headless-chrome
         * This is supported only with Protractor 5.1.2+ should be in package.json. So need to do an `npm install` again.
         */
        chromeOptions: {
            'args': [
                '--test-type',
                '--no-sandbox',
                '--disable-web-security',
                // '--headless',
                // '--disable-gpu'
            ]
        },
        locationContextEnabled: true,
        javascriptEnabled: true,
        acceptSslCerts: true,
        trustAllSSLCertificates: true,
        acceptInsecureCerts: true,
        idleTimeout: 120,
        ignoreUncaughtExceptions: true,
        handlesAlerts: true,
        loggingPrefs: { browser: 'SEVERE', driver: 'ALL' }
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        '../features/login.feature',
        '../features/credential.feature',
        '../features/cluster.feature',
        '../features/teardown.feature',
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
         * You can use parameter 'browser.params.baseUrl' with 'protractor protractor.conf.js --params.baseUrl=https://123.12.123.12:3000/'.
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
        //browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(20000);
        browser.manage().timeouts().pageLoadTimeout(60000);
    },
    cucumberOpts: {
        failFast: false,                                                                                            // <boolean> abort the run on first failure
        dryRun: false,                                                                                              // <boolean> invoke formatters without executing steps
        profile: [],                                                                                                // <string[]> (name) specify the profile to use
        compiler: "ts:ts-node/register",                                                                            // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        backtrace: true,                                                                                            // <boolean> show full backtrace for errors
        strict: true,                                                                                               // <boolean> fail if there are any undefined or pending steps
        format: [
            'pretty'
        ],                                                                                                          // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true,                                                                                              // <boolean> disable colors in formatter output
        snippets: true,                                                                                             // <boolean> hide step definition snippets for pending steps
        source: true,                                                                                               // <boolean> hide source uris
        ignoreUncaughtExceptions: true,
        defaultTimeoutInterval: 60000,
        timeout: 60000,                                                                                             // <number> timeout for step definitions
        require: [
            '../stepdefinitions/*/*.ts',
            '../support/*.ts'
        ],                                                                                                          // <string[]> (file/dir) require files before executing features
        tags: '@LoginScenario or @CredentialScenario or @ClusterScenario or @TeardownScenario or @LogoutScenario'   // <string[]> (expression) only execute the features or scenarios with tags matching the expression
    }
};
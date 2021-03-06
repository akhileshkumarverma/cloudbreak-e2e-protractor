## To Get Started

### Pre-requisites
1. Please install followings if these have not installed for you:
      * NodeJS
      * TypeScript
      * Google Chrome
    
    > You can check Protractor browser compatibility at [Protractor Browser Support](https://github.com/angular/protractor/blob/master/docs/browser-support.md)

2. IDE or Text Editor should be installed (WebStorm/Sublime/Visual Studio Code/Brackets)

3. Every variable from [environment file](testenvironment) should be present as environment variables with valid values:
    
    > For OS X Yosemite users with IntelliJ IDEA: You should add the environment variables to your
    `bash_profile` to can run tests directly form IDEA with no issues.
    The file should contain the variables for examples:
    
    ```
    export BASE_URL=your.url
    launchctl setenv BASE_URL $BASE_URL
    export USERNAME=your@mail.address
    launchctl setenv USERNAME $USERNAME
    export PASSWORD=your.password
    launchctl setenv PASSWORD $PASSWORD
    ...etc.
    ```
    
    > Please do not forget you should reopen your project and restart your IDE.
    
    If you do not want to create permanent environment variables on your machine, you can create a source file (for example `environment`) instead:
    
    ```
    export BASE_URL=your.url
    export USERNAME=your@mail.address
    export PASSWORD=your.password
    ...etc.
    export PATH=/<local path of the project>/cloud-e2e-protractor/node_modules/protractor/bin:$PATH
    ```
    
    After these you can set all of these in one round with `source` in current shell using:
        
    ```
    chmod +x environment
    . environment
    ```
    
    or
    
    ```
    chmod +x environment
    source environment
    ```

4. [Set your local Node environment up](https://yarnpkg.com/lang/en/docs/install/) (install every needed packages and tools) for the project. Run:
 
    ```yarn install```
   
   from the root of the project where the `package.json` is located.

### Executing Protractor tests
> If your Protractor test environment has just cloned, you should set up its Node environment first (install every needed packages and tools). The easiest way to get all the needed Node packages in one round to use `yarn install`. Please check the [yarn install](https://yarnpkg.com/en/docs/cli/install) documentation. Beyond these please check the [Protractor Tutorial](https://angular.github.io/protractor/#/tutorial).
> You do not need to launch the `webdriver-manager` for these tests, because of the `directConnect` is `true` by default in the [Protractor configuration](protractor.conf.ts). In this case the Protractor works directly with Chrome or Firefox Driver, bypassing any Selenium Server.

```
yarn test
```
> Above command compiles the project then launches all the tests in the Browser based on the project configuration.

### Protractor direct connect
Protractor can test directly using Chrome Driver, [bypassing any Selenium Server](https://github.com/angular/protractor/blob/master/docs/server-setup.md#connecting-directly-to-browser-drivers). **The advantage of direct connect is that your test project start up and run faster.**

To use this, you should change your config file:
```
directConnect: true
```
>**If this is true, settings for seleniumAddress and seleniumServerJar will be ignored.** If you attempt to use a browser other than Chrome or Firefox an error will be thrown.

## Page Object Pattern

> "now possible to build up large test suites using this pattern. There are no additional packages required to create page objects. It turns out that `Object.create` provides all necessary features we need:
>
> * inheritance between page objects
> * lazy loading of elements and
> * encapsulation of methods and actions
>
> The goal behind page objects is to abstract any page information away from the actual tests. Ideally you should store all selectors or specific instructions that are unique for a certain page in a page object, so that you still can run your test after you’ve completely redesigned your page." by [WebDriverIO](http://webdriver.io/guide/testrunner/pageobjects.html)

### Sample Page Object

```
import { browser, $, by, element, protractor } from 'protractor'

export class LoginPageObject {
    public usernameBox: any = $("input[id='username']");
    public passwordBox: any = $("input[id='password']");
    public loginButton: any = element(by.cssContainingText('.btn.btn-primary','Login'));
    
    login() {
    ...etc.
    }
    
    ...etc.

}
```
### Rule of Thumb
1. Define page selectors in getter functions
2. Define page actions in properties and methods

> "A page object wraps an HTML page, or fragment, with an application-specific API, allowing you to manipulate page elements without digging around in the HTML."
> The basic rule of thumb:
>
> 3. It should allow to do anything and see anything that a human can
> 4. It should also provide an interface that's easy to access and modify
> 5. It should hide the underlying widgetry
> 6. It should have accessor methods that take and return your values and commands
>   * check boxes should use booleans
>   * buttons should be represented by action oriented method names
>
> The page object should encapsulate the mechanics required to find and manipulate the data in the gui control itself." by [Martin Fowler](http://martinfowler.com/bliki/PageObject.html)

> "From the structural side it makes sense to separate spec files and page objects and put them into different directories."…"This is the basic principle of how to write page objects with WebdriverIO. Note that you can build up way more complex page object structures than this. For example have specific page objects for modals or split up a huge page object into different sections objects that inherit from the main page object. The pattern gives you really a lot of opportunities to encapsulate page information from your actual tests, which is important to keep your test suite structured and clear in times where the project and number of tests grows." by [WebDriverIO](http://webdriver.io/guide/testrunner/pageobjects.html)

### Define Selector i.e Getter Function
> …"all important selectors that are required in our page object as getter functions."…" These functions get evaluated when you actually access the property and not when you generate the object. With that you always request the element before you do an action on it." by [WebDriverIO](http://webdriver.io/guide/testrunner/pageobjects.html)

> "**get**: A function which serves as a getter for the property, or undefined if there is no getter. The function return will be used as the value of property." by [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)

### Define Action i.e "value" Function
> "Methods are actions that can be performed on objects. Object properties can be both primitive values, other objects, and functions. An object method is an object property containing a function definition." by [W3 Schools](http://www.w3schools.com/js/js_object_definition.asp)

> "Properties are the most important part of any JavaScript object."…"Properties are the values associated with a JavaScript object."…"All properties have a name. In addition they also have a value. The value is one of the property's attributes. Other attributes are: enumerable, configurable, and writable."…"In JavaScript, all attributes can be read, but only the value attribute can be changed (and only if the property is writable)." by [W3 Schools](http://www.w3schools.com/js/js_properties.asp)

> "**value**: Can be any valid JavaScript value (number, object, function, etc)." by [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)

## Docker image

**Docker image for executing headless Google Chrome Protractor e2e test cases in Docker container.**

The [cloudbreak-web-e2e](https://hub.docker.com/r/hortonworks/cloudbreak-web-e2e/) image is available here. 

### Makefile

We created a very simple Makefile to be able build and run easily our Docker image:
```
make run
```
or you can run the above commands in one round:

### To run tests in this container

1. Clone this repository to your local folder.
2. Provide valid and appropriate values for base test parameters in the [environment file](testenvironment), for example:
      ```
      export BASE_URL=your.url
      export USERNAME=your@mail.address
      export PASSWORD=your.password
      ...etc.
      ```
4. Build the image with Make:
      ```
      make build
      ```
5. Execute Protractor tests in [Docker container](https://docs.docker.com/engine/installation/), for example:
    ```
    make run
    ```
  - `cloud-e2e-runner` name of the new Docker container (created from `hortonworks/cloudbreak-web-e2e` Docker image).
  - `utils/testenv` the location (full path) of the `testenv` file on your machine.
  - `$(PWD)` or `$pwd` the root folder of your Protractor test project.
      - For example the local folder where the test project has been cloned from GitHub.
      - The use of **PWD is optional**, you do not need to navigate to the Protractor test project root. If it is the case, you should add the full path of the root folder instead of the `$(PWD)`.
  - `yarn test` launch tests.
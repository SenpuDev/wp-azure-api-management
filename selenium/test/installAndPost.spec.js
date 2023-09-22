// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const assert = require('assert')

describe('Enable Plugin & Create Post', function() {
  this.timeout(30000)
  let driver
  let vars

  beforeEach(async function() {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments(
      '--disable-notifications',
      '--disable-infobars',
      '--disable-extensions',
      '--window-size=1920,1080',
      '--headless'
    );

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();

    vars = {};
  });

  afterEach(async function() {
    await driver.quit();
  });

  it('Enable Plugin & Create Post', async function() {
    // Login
    try {
      await driver.get("http://localhost:8080/wp-login.php")
      await driver.manage().window().setRect({ width: 980, height: 803 })
      await driver.wait(until.elementLocated(By.id("user_login")), 3000)
      await driver.findElement(By.id("user_login")).click()
      await driver.findElement(By.id("user_login")).sendKeys("root")
      await driver.findElement(By.id("user_pass")).click()
      await driver.findElement(By.id("user_pass")).sendKeys("root")
      await driver.findElement(By.id("wp-submit")).click()
      // Waiting until user is in dashboard
      // Wait to plugin menu button is avaiable
      await driver.wait(until.elementLocated(By.css(".menu-icon-plugins > .wp-menu-name")), NaN) // 
      vars["dashboardUrl"] = await driver.executeScript("return document.URL;")
      assert(vars["dashboardUrl"].toString() == "http://localhost:8080/wp-admin/")
      console.log('USER IS LOGGED ✅')
    } catch (error) {
      console.log('ERROR TRYING TO LOG USER ❌')
    }

    // Activate Plugin if required
    try {
      await driver.findElement(By.css(".menu-icon-plugins > .wp-menu-name")).click()
      vars["isInactive"] = await driver.executeScript("return !!document.getElementById(\'activate-wp-azure-api-management\');")
      if (!!await driver.executeScript("return (arguments[0])", vars["isInactive"])) {
        await driver.findElement(By.id("activate-wp-azure-api-management")).click()
        await driver.findElement(By.css("#message > p")).click()
        {
          const elements = await driver.findElements(By.id("activate-wp-azure-api-management"))
          assert(!elements.length)
        }
        await driver.wait(until.elementLocated(By.css("#message > p")), NaN)
      }
      console.log('PLUGIN IS ACTIVE ✅')
    } catch (error) {
      console.log('ERROR TRYING TO ACTIVE PLUGIN ❌')
    }

    // Creating new API
    try {
      await driver.findElement(By.css(".menu-icon-azure_api_management > .wp-menu-name")).click()
      await driver.findElement(By.id("title")).click()
      await driver.findElement(By.css(".page-title-action")).click()
      await driver.findElement(By.id("title")).click()
      await driver.findElement(By.id("title")).sendKeys("test api")
      await driver.findElement(By.id("azure_api_management_json_yaml_upload_button")).click()
      await driver.wait(until.elementLocated(By.id("menu-item-browse")), 3000)
      await driver.findElement(By.id("menu-item-browse")).click()
      await driver.wait(until.elementLocated(By.css(".thumbnail")), 3000)
      await driver.findElement(By.css(".thumbnail")).click()
      await driver.findElement(By.css(".media-button")).click()
      await driver.findElement(By.id("publish")).click()
      await driver.wait(until.elementLocated(By.css("strong:nth-child(1)")), 3000)
      vars["embedCode"] = await driver.findElement(By.css("strong:nth-child(1)")).getText()
      console.log('API CREATED ✅')
    } catch (error) {
      console.log('ERROR CREATING API ❌')
    }
    
    // Creating new Post
    try {
      await driver.findElement(By.css(".menu-icon-post > .wp-menu-name")).click()
      await driver.findElement(By.css(".page-title-action")).click()

      //Check if wellcome modal is showing
      const element = await driver.findElements(By.css(".components-modal__header svg"));
      if (element.length > 0) {
        await driver.findElement(By.css(".components-modal__header svg")).click()
      } 

      await driver.wait(until.elementLocated(By.css(".interface-more-menu-dropdown button")), 3000)
      await driver.findElement(By.css(".interface-more-menu-dropdown button")).click()
      await driver.wait(until.elementLocated(By.css(".components-menu-items-choice:nth-child(2) > .components-menu-item__item")), 3000)
      await driver.findElement(By.css(".components-menu-items-choice:nth-child(2) > .components-menu-item__item")).click()
      await driver.findElement(By.css(".interface-more-menu-dropdown button")).click()
      await driver.wait(until.elementLocated(By.id("post-content-0")), 3000)
      await driver.findElement(By.id("post-content-0")).click()
      await driver.findElement(By.id("post-content-0")).sendKeys(vars["embedCode"])
      await driver.findElement(By.css(".components-button:nth-child(2)")).click()
      await driver.wait(until.elementLocated(By.css(".editor-post-publish-panel__toggle")), 3000)
      await driver.findElement(By.css(".editor-post-publish-panel__toggle")).click()
      await driver.findElement(By.css(".editor-post-publish-button")).click()
      console.log('POST PUBLISHED ✅')
    } catch (error) {
      console.log('ERROR PUBLISHING POST ❌', error)
    }
    
    // Check if post contain API
    try {
      await driver.wait(until.elementLocated(By.css(".post-publish-panel__postpublish-buttons > .is-primary")), 3000)
      await driver.findElement(By.css(".post-publish-panel__postpublish-buttons > .is-primary")).click()
      await driver.wait(until.elementLocated(By.css(".btn")), 3000)
      await driver.findElement(By.css(".btn")).click()
      console.log('POST CONTAINS API ✅')
    } catch (error) {
      console.log('ERROR CHECKING POST❌')
    }
  })
})

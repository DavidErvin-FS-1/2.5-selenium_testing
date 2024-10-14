const { Builder, By, until } = require("selenium-webdriver")

;(async function runTests() {
  // Initialize the WebDriver
  let driver = await new Builder().forBrowser("chrome").build()

  try {
    // Test 1: Should open homepage and check the title
    await driver.get("http://localhost:3000")
    let title = await driver.getTitle()
    console.log(`Homepage title: ${title}`)
    if (title === "Home") {
      console.log("Test 1 passed: Homepage title is correct.")
    } else {
      console.log("Test 1 failed: Homepage title is incorrect.")
    }

    // Test 2: Should open contact page and check the title
    await driver.findElement(By.id("contactLink")).click()
    await driver.wait(until.titleIs("Contact Us"), 1000)
    title = await driver.getTitle()
    console.log(`Contact page title: ${title}`)
    if (title === "Contact Us") {
      console.log("Test 2 passed: Contact page title is correct.")
    } else {
      console.log("Test 2 failed: Contact page title is incorrect.")
    }

    // Test 3: Should sign up for more info via email
    const email = "test@example.com"
    await driver.findElement(By.id("formInput")).sendKeys(email)
    await driver.findElement(By.id("formSubmit")).click()
    await driver.wait(until.elementLocated(By.id("formMessage")), 1000)

    const message = await driver.findElement(By.id("formMessage")).getText()
    console.log(`Form message: ${message}`)
    if (message === `More info coming to ${email}`) {
      console.log("Test 3 passed: Form message is correct.")
    } else {
      console.log("Test 3 failed: Form message is incorrect.")
    }
  } catch (error) {
    console.error("Error during tests:", error)
  } finally {
    await driver.quit() // Close the browser
  }
})()

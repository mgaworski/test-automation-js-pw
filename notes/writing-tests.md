https://playwright.dev/docs/running-tests
# Navigation
Most tests start by navigating to a URL. After that, the test interacts with page elements.
```
await page.goto('https://playwright.dev/');
```
Playwright waits for the page to reach the load state before continuing. Learn more about page.goto() options.
# Interactions
Performing actions starts with locating elements. Playwright uses Locators API for that. Locators represent a way to find element(s) on the page at any moment.
- ```page.getByRole()``` to locate by explicit and implicit accessibility attributes.
- ```page.getByText()``` to locate by text content.
- ```page.getByLabel()``` to locate a form control by associated label's text.
- ```page.getByPlaceholder()``` to locate an input by placeholder.
- ```page.getByAltText()``` to locate an element, usually image, by its text alternative.
- ```page.getByTitle()``` to locate an element by its title attribute.
- ```page.getByTestId()``` to locate an element based on its data-testid attribute (other attributes can be configured).

Playwright waits for the element to be actionable before performing the action, so you don't need to wait for it to become available.
```
const getStarted = page.getByRole('link', { name: 'Get started' });
await getStarted.click();
```
In most cases, it'll be written in one line:
```
await page.getByRole('link', { name: 'Get started' }).click();
```
Here are the most popular Playwright actions.
- ```locator.check()``` Check the input checkbox
- ```locator.click()``` Click the element
- ```locator.uncheck()``` Uncheck the input checkbox
- ```locator.hover()``` Hover mouse over the element
- ```locator.fill()``` Fill the form field, input text
- ```locator.focus()``` Focus the element
- ```locator.press()``` Press single key
- ```locator.setInputFiles()``` Pick files to upload
- ```locator.selectOption()``` Select option in the drop down
# Assertions
Playwright includes test assertions in the form of expect function. To make an assertion, call expect(value) and choose a matcher that reflects the expectation.

Playwright includes async matchers that wait until the expected condition is met. Using these matchers makes tests non-flaky and resilient. For example, this code waits until the page gets the title containing "Playwright":
```
await expect(page).toHaveTitle(/Playwright/);
```
- ```expect(locator).toBeChecked()``` Checkbox is checked
- ```expect(locator).toBeEnabled()``` Control is enabled
- ```expect(locator).toBeVisible()``` Element is visible
- ```expect(locator).toContainText()``` Element contains text
- ```expect(locator).toHaveAttribute()``` Element has attribute
- ```expect(locator).toHaveCount()``` List of elements has given length
- ```expect(locator).toHaveText()``` Element matches text
- ```expect(locator).toHaveValue()``` Input element has value
- ```expect(page).toHaveTitle()``` Page has title
- ```expect(page).toHaveURL()``` Page has URL
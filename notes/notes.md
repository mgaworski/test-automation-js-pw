# Command line
- ```npx playwright --version``` - check your installed version.
- ```npx playwright test``` - runs the end-to-end tests.
- ```npx playwright test --ui``` - starts the interactive UI mode.
- ```npx playwright test --project=chromium``` - runs the tests only on Desktop Chrome.
- ```npx playwright test example``` - runs the tests in a specific file.
- ```npx playwright test --debug``` - runs the tests in debug mode.
- ```npx playwright codegen``` - auto generate tests with Codegen.
- ```npx playwright test --grep @fast``` - run tests that have a particular tag.
- ```npx playwright test --grep-invert @fast``` - skip the tests with a certain tag.
- ```npx playwright test --grep --% "@fast^|@slow"``` - run tests containing either tag (logical OR operator).
- ```npx playwright test --grep "(?=.*@fast)(?=.*@slow)"``` - run tests containing both tags (logical AND operator).
- ```npx playwright test tests/todo-page.spec.ts``` run a single test file

Important files:
  - ```./tests/*.spec.js``` - End-to-end test
  - ```./playwright.config.js``` - Playwright Test configuration

Update Playwright and download new browser binaries and their dependencies:
```
npm install -D @playwright/test@latest
npx playwright install --with-deps
```
# Writing tests
1. [Navigation](writing-tests#navigation)
2. [Interactions](writing-tests#interactions)
3. [Assertions](writing-tests#assertions)
# Test management
4. [Annotations](test-management#annotations)
5. [Grouping](test-management#groupping)
6. [Tagging](test-management#tagging)
# Annotations
- ```test.skip()``` marks the test as irrelevant. Playwright does not run such a test. Use this annotation when the test is not applicable in some configuration.
- ```test.fail()``` marks the test as failing. Playwright will run this test and ensure it does indeed fail. If the test does not fail, Playwright will complain.
- ```test.fixme()``` marks the test as failing. Playwright will not run this test, as opposed to the fail annotation. Use fixme when running the test is slow or crashes.
- ```test.slow()``` marks the test as slow and triples the test timeout.
- ```test.only()``` focus some tests. When there are focused tests, only these tests run.

Annotations can be added to a single test or a group of tests.
# Groupping
You can group tests to give them a logical name or to scope before/after hooks to the group.
```
import { test, expect } from '@playwright/test';

test.describe('two tests', () => {
  test('one', async ({ page }) => {
    // ...
  });

  test('two', async ({ page }) => {
    // ...
  });
});
```
# Tagging
To tag a test, either provide an additional details object when declaring a test, or add @-token to the test title. Note that tags must start with @ symbol.
```
import { test, expect } from '@playwright/test';

test('test login page', {
  tag: '@fast',
}, async ({ page }) => {
  // ...
});

test('test full report @slow', async ({ page }) => {
  // ...
});
```
Tag all tests in a group or provide multiple tags:
```
import { test, expect } from '@playwright/test';

test.describe('group', {
  tag: '@report',
}, () => {
  test('test report header', async ({ page }) => {
    // ...
  });

  test('test full report', {
    tag: ['@slow', '@vrt'],
  }, async ({ page }) => {
    // ...
  });
});
```
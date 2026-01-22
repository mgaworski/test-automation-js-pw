import { test, expect } from '@playwright/test';

process.env.ENV = "api";
const cfg = require('../../utilities/loadEnvHelper');

test('GET my ip', async ({ request }) => {
    const res = await request.get(cfg.appURL);
    expect(res.ok()).toBeTruthy();
});
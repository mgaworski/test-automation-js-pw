import { test, expect } from '@playwright/test';

const cfg = require('../../utilities/loadEnvHelper');

test('GET my ip', async ({ request }) => {
    const res = await request.get(cfg.ipifyURL);
    expect(res.ok()).toBeTruthy();
});
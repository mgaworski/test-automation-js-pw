import { test, expect } from '@playwright/test';
import { IpifyClient } from '../../clients/ipify/ipifyClient.js';

const cfg = require('../../../utilities/loadEnvHelper.js');

test.describe('Ipify API', () => {

    test('Verify Ipify returns public IP as plain text', async ({ request }) => {
        const client = new IpifyClient(request, cfg);

        const res = await client.getIpText();
        expect(res.ok()).toBeTruthy();

        const ip = (await res.text()).trim();
        expect(ip).toMatch(/^\d{1,3}(\.\d{1,3}){3}$|:/); // IPv4 or IPv6
    });

    test('Verify Ipify returns public IP as JSON', async ({ request }) => {
        const client = new IpifyClient(request, cfg);

        const res = await client.getIpJson();
        expect(res.ok()).toBeTruthy();

        const body = await res.json();
        expect(body).toHaveProperty('ip');
        expect(body.ip).toMatch(/^\d{1,3}(\.\d{1,3}){3}$|:/);
    });

});
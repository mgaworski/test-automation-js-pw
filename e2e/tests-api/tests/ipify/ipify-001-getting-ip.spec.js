import { test, expect } from '@playwright/test';
import { IpifyClient } from '../../clients/ipify/ipifyClient.js';

const cfg = require('../../../utilities/loadEnvHelper.js');

test.describe('Ipify API', () => {

    test('Verify Ipify returns public IP as plain text', async ({ request }) => {
        const ipifyClient = new IpifyClient(request, cfg);
        const response = await ipifyClient.getIpText();
        expect(response.ok()).toBeTruthy();
        const ip = (await response.text()).trim();
        expect(ip).toMatch(/^\d{1,3}(\.\d{1,3}){3}$|:/); // IPv4 or IPv6
    });

    test('Verify Ipify returns public IP as JSON', async ({ request }) => {
        const ipifyClient = new IpifyClient(request, cfg);
        const response = await ipifyClient.getIpJson();
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body).toHaveProperty('ip');
        expect(body.ip).toMatch(/^\d{1,3}(\.\d{1,3}){3}$|:/);
    });

});
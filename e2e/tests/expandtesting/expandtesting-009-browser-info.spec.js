import { test, expect } from '@playwright/test';
import { MyBrowserInformationPage } from '../../pages/expandtesting/my-browser-information.page';

const cfg = require('../../utilities/loadEnvHelper');

test.describe("Expand testing #9 - show/hide browser info", () => {

    test("Verify show/hide browser infor works.", async ({ page }) => {
        const myBrowserInformationPage = new MyBrowserInformationPage(page, cfg);
        await myBrowserInformationPage.open();
        await expect(myBrowserInformationPage.showBrowserInformationButton).toHaveCount(1);
        await expect(myBrowserInformationPage.hideBrowserInformationButton).toHaveCount(0);
        await expect(myBrowserInformationPage.browserInfoTable).not.toBeVisible();
        await myBrowserInformationPage.showBrowserInfo();
        await expect(myBrowserInformationPage.showBrowserInformationButton).toHaveCount(0);
        await expect(myBrowserInformationPage.hideBrowserInformationButton).toHaveCount(1);
        await expect(myBrowserInformationPage.browserInfoTable).toBeVisible();
        await myBrowserInformationPage.hideBrowserInfo();
        await expect(myBrowserInformationPage.showBrowserInformationButton).toHaveCount(1);
        await expect(myBrowserInformationPage.hideBrowserInformationButton).toHaveCount(0);
        await expect(myBrowserInformationPage.browserInfoTable).not.toBeVisible();
    });

});
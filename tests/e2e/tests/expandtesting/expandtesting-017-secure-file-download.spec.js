import { test, expect } from '@playwright/test';
import { SecureFileDownloaderPage } from '../../pages/expandtesting/secure-file-downloader.page';

const cfg = require('../../../utilities/loadEnvHelper');

test.describe("Expand testing #17 - Secure file download", () => {

    const FILE_NAME = "cdct.jpg";

    test("Verify secure file download", async ({ page }) => {
        const secureFileDownloaderPage = new SecureFileDownloaderPage(page, cfg);
        await secureFileDownloaderPage.open_auth(secureFileDownloaderPage.user, secureFileDownloaderPage.pass);
        await expect(secureFileDownloaderPage.downloadLink(FILE_NAME)).toBeVisible();
        const download = await secureFileDownloaderPage.download(FILE_NAME);
        expect(download.suggestedFilename()).toBe(FILE_NAME);
    });

});
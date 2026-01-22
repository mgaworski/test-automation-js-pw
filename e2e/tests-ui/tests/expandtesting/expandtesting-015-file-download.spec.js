import { test, expect } from '@playwright/test';
import { FileDownloaderPage } from '../../pages/expandtesting/file-downloader.page';

const cfg = require('../../../utilities/loadEnvHelper');

test.describe("Expand testing #15 - File download", () => {

    const FILE_NAME = "cdct.jpg";

    test("Verify file download", async ({ page }) => {
        const fileDownloaderPage = new FileDownloaderPage(page, cfg);
        await fileDownloaderPage.open();
        await expect(fileDownloaderPage.downloadLink(FILE_NAME)).toBeVisible();
        const download = await fileDownloaderPage.download(FILE_NAME);
        expect(download.suggestedFilename()).toBe(FILE_NAME);
    });

});
import { test, expect } from '@playwright/test';
import { FileDownloaderPage } from '../../pages/expandtesting/file-downloader.page';

import fs from 'fs';
import path from 'path';
import os from 'os';

const cfg = require('../../utilities/loadEnvHelper');

test.describe("Expand testing #13 - Form validation", () => {

    const FILE_NAME = "cdct.jpg";

    test.only("Verify file download", async ({ page }) => {
        const fileDownloaderPage = new FileDownloaderPage(page, cfg);
        await fileDownloaderPage.open();
        await expect(fileDownloaderPage.downloadLink(FILE_NAME)).toBeVisible();
        const download = await fileDownloaderPage.download(FILE_NAME);
        expect(download.suggestedFilename()).toBe(FILE_NAME);
    });

});
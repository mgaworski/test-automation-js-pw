import { test, expect } from '@playwright/test';
import { FileUploaderPage } from '../../pages/expandtesting/file-uploader.page';

import fs from 'fs';
import path from 'path';
import os from 'os';

const cfg = require('../../utilities/loadEnvHelper');

test.describe("Expand testing #14 - File upload", () => {

    const FILE_NAME = "file_to_be_uploaded.txt";
    const FILE_PATH = `./e2e/resources/${FILE_NAME}`;

    test("Verify file upload", async ({ page }) => {
        const fileUploaderPage = new FileUploaderPage(page, cfg);
        await fileUploaderPage.open();
        await expect(fileUploaderPage.fileInput).toBeAttached();
        await fileUploaderPage.upload(FILE_PATH);
        await expect(fileUploaderPage.fileUploadedMsg).toBeVisible();
        await expect(fileUploaderPage.fileUploadedList).toContainText(FILE_NAME); 
    });

});
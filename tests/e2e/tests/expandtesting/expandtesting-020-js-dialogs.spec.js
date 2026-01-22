import { test, expect } from '@playwright/test';
import { JavaScriptDialogsPage } from '../../pages/expandtesting/javascript-dialogs.page';

const cfg = require('../../../utilities/loadEnvHelper');

test.describe("Expand testing #20 - JS Dialogs", () => {

    test.beforeEach(async ({ page }) => {
        const javaScriptDialogsPage = new JavaScriptDialogsPage(page, cfg);
        await javaScriptDialogsPage.open();
    });

    // Alert
    test("Verify JS Alert can be accepted", async ({ page }) => {
        const javaScriptDialogsPage = new JavaScriptDialogsPage(page, cfg);
        await javaScriptDialogsPage.alert();
        await expect(javaScriptDialogsPage.dialogResponseText).toHaveText("OK");
    });

    // Confirm
    test("Verify JS Confirm can be canceled", async ({ page }) => {
        const javaScriptDialogsPage = new JavaScriptDialogsPage(page, cfg);
        await javaScriptDialogsPage.confirmCancel();
        await expect(javaScriptDialogsPage.dialogResponseText).toHaveText("Cancel");
    });

    test("Verify JS Confirm can be accepted", async ({ page }) => {
        const javaScriptDialogsPage = new JavaScriptDialogsPage(page, cfg);
        await javaScriptDialogsPage.confirmAccept();
        await expect(javaScriptDialogsPage.dialogResponseText).toHaveText("Ok");
    });

    // Prompt
    test("Verify JS Prompt can be canceled", async ({ page }) => {
        const javaScriptDialogsPage = new JavaScriptDialogsPage(page, cfg);
        await javaScriptDialogsPage.promptCancel();
        await expect(javaScriptDialogsPage.dialogResponseText).toHaveText("");
    });

    test("Verify JS Prompt can be entered and accepted", async ({ page }) => {
        const PROMPT = "This is some prompt I just made up on the spot!";
        const javaScriptDialogsPage = new JavaScriptDialogsPage(page, cfg);
        await javaScriptDialogsPage.promptEnter(PROMPT);
        await expect(javaScriptDialogsPage.dialogResponseText).toHaveText(PROMPT);
    });

});
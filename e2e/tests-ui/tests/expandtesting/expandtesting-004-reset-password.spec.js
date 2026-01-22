import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../../pages/expandtesting/forgot-password.page.js';

const cfg = require('../../../utilities/loadEnvHelper.js');
const { checkMailinator } = require('../../../utilities/mailinatorHelper.js');

test.describe('Expand testing #4 - test password reset', () => {

    test.beforeEach(async ({ page }) => {
        const forgotPasswordPage = new ForgotPasswordPage(page, cfg);
        await forgotPasswordPage.open();
    });

    test("Verify password recovery mail is sent.", async ({ page }) => {
        const timestamp = Date.now();
        const mailbox = `et_Mail_${timestamp}`;
        const mail = `${mailbox}@mailinator.com`;
        const forgotPasswordPage = new ForgotPasswordPage(page, cfg);
        await forgotPasswordPage.retrieve(mail);
        const found = await checkMailinator(mailbox, forgotPasswordPage.mailTopic, {
            timeoutMs: 90000,      // optional override
            pollIntervalMs: 5000,  // optional override
        });
        await expect(forgotPasswordPage.validMailTextArea).toBeVisible();
    });

    test("Verify error is displayed when incorrect mail is used.", async ({ page }) => {
        const mail = `not_a_mail`;
        const forgotPasswordPage = new ForgotPasswordPage(page, cfg);
        await forgotPasswordPage.retrieve(mail);
        await expect(forgotPasswordPage.invalidMailTextArea).toBeVisible();
    });

});
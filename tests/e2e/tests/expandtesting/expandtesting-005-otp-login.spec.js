import { test, expect } from '@playwright/test';
import { OTPLoginPage } from '../../pages/expandtesting/otp-login.page.js';
import { OTPVerificationPage } from '../../pages/expandtesting/otp-verification.page.js';
import { SecureAreaPage } from '../../pages/expandtesting/secure-area.page.js';

const cfg = require('../../utilities/loadEnvHelper.js');
const { loadData } = require('../../utilities/loadDataHelper.js');
const otp = loadData('otp');

test.describe('Expand testing #5 - test OTP login', () => {

    test.beforeEach(async ({ page }) => {
        const otpLoginPage = new OTPLoginPage(page, cfg);
        await otpLoginPage.open();
    });

    test("Verify login with proper OTP.", async ({ page }) => {
        const otpLoginPage = new OTPLoginPage(page, cfg);
        await otpLoginPage.getOTP(otp.validOTP.mail);
        const otpVerificationPage = new OTPVerificationPage(page, cfg);
        await expect(otpVerificationPage.otpSentTextArea).toBeVisible();
        await otpVerificationPage.verifyOTP(otp.validOTP.otp);
        const secureAreaPage = new SecureAreaPage(page, cfg);
        await expect(secureAreaPage.page).toHaveURL(secureAreaPage.url);
        await expect(secureAreaPage.confirmationTextArea).toBeVisible();
        await expect(secureAreaPage.logoutButton).toBeVisible();
    });

    test("Verify no login with incorrect OTP.", async ({ page }) => {
        const otpLoginPage = new OTPLoginPage(page, cfg);
        await otpLoginPage.getOTP(otp.validOTP.mail);
        const otpVerificationPage = new OTPVerificationPage(page, cfg);
        await expect(otpVerificationPage.otpSentTextArea).toBeVisible();
        await otpVerificationPage.verifyOTP("666007");
        await expect(otpVerificationPage.incorrectOTPTextArea).toBeVisible();
    });

    test("Verify misformatted mail error handling.", async ({ page }) => {
        const otpLoginPage = new OTPLoginPage(page, cfg);
        await otpLoginPage.getOTP("not_a_valid_mail");
        await expect(otpLoginPage.invalidMailTextArea).toBeVisible();
    });

});
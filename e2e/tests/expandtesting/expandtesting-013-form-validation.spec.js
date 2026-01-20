import { test, expect } from '@playwright/test';
import { FormValidationPage } from '../../pages/expandtesting/form-validation.page';

const cfg = require('../../utilities/loadEnvHelper');
const { getDateYYYYMMDD } = require('../../utilities/timeDateHelper');

test.describe("Expand testing #13 - Form validation", () => {

    test.beforeEach(async ({ page }) => {
        const formValidationPage = new FormValidationPage(page, cfg);
        await formValidationPage.open();
    });

    // Form data

    const VALID_CONTACT_NAME = "John Smith";
    const VALID_CONTACT_PHONE = "010-7654321";
    const VALID_PICKUP_DATA = getDateYYYYMMDD(14); // Two weeks forward

    // Contact name
    test("Verify contact name is required", async ({ page }) => {
        const formValidationPage = new FormValidationPage(page, cfg);
        await formValidationPage.fillForm("", VALID_CONTACT_PHONE, VALID_PICKUP_DATA, formValidationPage.paymentCard);
        await expect(formValidationPage.invalidContactNameMsg).toBeVisible();
        await expect(formValidationPage.invalidContactNumberMsg).not.toBeVisible();
        await expect(formValidationPage.invalidPickUpDateMsg).not.toBeVisible();
        await expect(formValidationPage.invalidPaymentMethodMsg).not.toBeVisible();
    });

    // Contact number
    test("Verify contact number is required", async ({ page }) => {
        const formValidationPage = new FormValidationPage(page, cfg);
        await formValidationPage.fillForm(VALID_CONTACT_NAME, "XKJAHSGS", VALID_PICKUP_DATA, formValidationPage.paymentCard);
        await expect(formValidationPage.invalidContactNameMsg).not.toBeVisible();
        await expect(formValidationPage.invalidContactNumberMsg).toBeVisible();
        await expect(formValidationPage.invalidPickUpDateMsg).not.toBeVisible();
        await expect(formValidationPage.invalidPaymentMethodMsg).not.toBeVisible();
    });

    // PickUp Date
    test("Verify pick up date is required", async ({ page }) => {
        const formValidationPage = new FormValidationPage(page, cfg);
        await formValidationPage.fillForm(VALID_CONTACT_NAME, VALID_CONTACT_PHONE, null, formValidationPage.paymentCard);
        await expect(formValidationPage.invalidContactNameMsg).not.toBeVisible();
        await expect(formValidationPage.invalidContactNumberMsg).not.toBeVisible();
        await expect(formValidationPage.invalidPickUpDateMsg).toBeVisible();
        await expect(formValidationPage.invalidPaymentMethodMsg).not.toBeVisible();
    });

    // Payment Method
    test("Verify payment type is required", async ({ page }) => {
        const formValidationPage = new FormValidationPage(page, cfg);
        await formValidationPage.fillForm(VALID_CONTACT_NAME, VALID_CONTACT_PHONE, VALID_PICKUP_DATA, null);
        await expect(formValidationPage.invalidContactNameMsg).not.toBeVisible();
        await expect(formValidationPage.invalidContactNumberMsg).not.toBeVisible();
        await expect(formValidationPage.invalidPickUpDateMsg).not.toBeVisible();
        await expect(formValidationPage.invalidPaymentMethodMsg).toBeVisible();
    });

    // Form submission
    test("Verify form is correctly submitted when data entered is correct", async ({ page }) => {
        const formValidationPage = new FormValidationPage(page, cfg);
        await formValidationPage.fillForm(VALID_CONTACT_NAME, VALID_CONTACT_PHONE, VALID_PICKUP_DATA, formValidationPage.paymentCard);
        await expect(formValidationPage.invalidContactNameMsg).not.toBeVisible();
        await expect(formValidationPage.invalidContactNumberMsg).not.toBeVisible();
        await expect(formValidationPage.invalidPickUpDateMsg).not.toBeVisible();
        await expect(formValidationPage.invalidPaymentMethodMsg).not.toBeVisible();
    });

});
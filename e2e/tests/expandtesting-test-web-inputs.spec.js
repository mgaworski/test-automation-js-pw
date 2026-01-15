import { test, expect } from '@playwright/test';
import { WebInputsPage } from '../pages/web-inputs.page';

const cfg = require('../utilities/loadEnvHelper');
const { loadData } = require('../utilities/loadDataHelper');
const { getDateYYYYMMDD } = require('../utilities/timeDateHelper');

test.describe('Expand testing #1 - test web inputs', () => {

    test.beforeEach(async ({ page }) => {
        const webInputsPage = new WebInputsPage(page, cfg);
        await webInputsPage.open();
        await webInputsPage.clearInputs();
    });

    test('Verify Input:Number accepts a number.', async ({ page }) => {
        const number = 124;
        const webInputsPage = new WebInputsPage(page, cfg);
        await webInputsPage.fillNumber(number)
        await webInputsPage.displayOutputs();
        await expect(webInputsPage.numberOutputField).toHaveText(number.toString());
    });

    test('Verify Input:Text accepts text.', async ({ page }) => {
        const text = "Some text";
        const webInputsPage = new WebInputsPage(page, cfg);
        await webInputsPage.fillText(text)
        await webInputsPage.displayOutputs();
        await expect(webInputsPage.textOutputField).toHaveText(text);
    });

    test('Verify Input:Password accepts password but does not displays it.', async ({ page }) => {
        const password = "K%S&D%UDGjsgdautda87dg-asdakdsg";
        const webInputsPage = new WebInputsPage(page, cfg);
        await webInputsPage.fillPassword(password)
        await webInputsPage.displayOutputs();
        await expect(webInputsPage.passwordOutputField).toHaveText(password);
        await expect(webInputsPage.passwordInputField).not.toHaveText(password);
    });

    test('Verify Input:Date accepts current date', async ({ page }) => {
        let currentDate = getDateYYYYMMDD();
        const webInputsPage = new WebInputsPage(page, cfg);
        await webInputsPage.fillDate(currentDate)
        await webInputsPage.displayOutputs();
        await expect(webInputsPage.dateOutputField).toHaveText(currentDate);
    });

    test('Verify Input:Date accepts past date', async ({ page }) => {
        let pastDate = getDateYYYYMMDD(-10);
        const webInputsPage = new WebInputsPage(page, cfg);
        await webInputsPage.fillDate(pastDate)
        await webInputsPage.displayOutputs();
        await expect(webInputsPage.dateOutputField).toHaveText(pastDate);
    });

    test('Verify Input:Date accepts future date', async ({ page }) => {
        let futureDate = getDateYYYYMMDD(10);
        const webInputsPage = new WebInputsPage(page, cfg);
        await webInputsPage.fillDate(futureDate)
        await webInputsPage.displayOutputs();
        await expect(webInputsPage.dateOutputField).toHaveText(futureDate);
    });

});
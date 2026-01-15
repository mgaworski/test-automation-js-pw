import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/expandtesting/register.page';
import { LoginPage } from '../../pages/expandtesting/login.page';

const cfg = require('../../utilities/loadEnvHelper');
const { loadData } = require('../../utilities/loadDataHelper');
const users = loadData('users');


test.describe('Expand testing #3 - test register page', () => {

    test.beforeEach(async ({ page }) => {
        const registerPage = new RegisterPage(page, cfg);
        await registerPage.open();
    });

    test('Verify registration works with correct inputs', async ({ page }) => {
        const timestamp = Date.now();
        const registerPage = new RegisterPage(page, cfg);
        let regUserName = `${users.registerUser.name}${timestamp}`
        await registerPage.register(regUserName, users.registerUser.password);
        const loginPage = new LoginPage(page, cfg);
        await expect(loginPage.successfulRegistrationTextArea).toBeVisible();
        await expect(loginPage.page).toHaveURL(loginPage.url);
    });

    test('Verify registration fails when password shorter than 4 characters', async ({ page }) => {
        const timestamp = Date.now();
        const registerPage = new RegisterPage(page, cfg);
        let shortPwUserName = `${users.shortPasswordUser.name}${timestamp}`
        await registerPage.register(shortPwUserName, users.shortPasswordUser.password);
        await expect(registerPage.passwordShortTextArea).toBeVisible();
        await expect(registerPage.page).toHaveURL(registerPage.url);
    });

    test('Verify registration fails when passwords mismatch', async ({ page }) => {
        const timestamp = Date.now();
        const registerPage = new RegisterPage(page, cfg);
        let regUserName = `${users.registerUser.name}${timestamp}`
        await registerPage.register(regUserName, users.registerUser.password, "otherPassword");
        await expect(registerPage.passwordsMismatchTextArea).toBeVisible();
        await expect(registerPage.page).toHaveURL(registerPage.url);
    });

});
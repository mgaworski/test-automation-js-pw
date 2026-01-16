import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/expandtesting/login.page.js';
import { SecureAreaPage } from '../../pages/expandtesting/secure-area.page.js';

const cfg = require('../../utilities/loadEnvHelper.js');
const { loadData } = require('../../utilities/loadDataHelper.js');
const users = loadData('users');

test.describe('Expand testing #2 - test login', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page, cfg);
        await loginPage.open();
    });

    /*
    Test Case 1: Successful Login
        Launch the browser.
        Navigate to the login page URL.
        Verify that the login page is displayed successfully.
        Enter Username: practice.
        Enter Password: SuperSecretPassword!.
        Click the Login button.
        Verify that the user is redirected to the /secure page.
        Confirm the success message "You logged into a secure area!" is visible.
        Verify that a Logout button is displayed.
    */

    test('Verify successful login with correct credentials', async ({ page }) => {
        const loginPage = new LoginPage(page, cfg);
        await loginPage.login(users.validUser.name, users.validUser.password);
        const secureAreaPage = new SecureAreaPage(page, cfg);
        await expect(secureAreaPage.page).toHaveURL(secureAreaPage.url);
        await expect(secureAreaPage.confirmationTextArea).toBeVisible();
        await expect(secureAreaPage.logoutButton).toBeVisible();
    });

    /*
    Test Case 2: Invalid Username
        Launch the browser.
        Navigate to the login page URL.
        Verify that the login page is displayed successfully.
        Enter an incorrect Username (e.g., wrongUser).
        Enter Password: SuperSecretPassword!.
        Click the Login button.
        Verify that an error message "Invalid username." is displayed.
        Ensure the user remains on the login page.
    */

    test('Verify login with invalid username fails', async ({ page }) => {
        const loginPage = new LoginPage(page, cfg);
        await loginPage.login(users.invalidNameUser.name, users.invalidNameUser.password);
        await expect(loginPage.page).toHaveURL(loginPage.url);
        await expect(loginPage.invalidUsernameTextArea).toBeVisible();
    });

    /*
    Test Case 3: Invalid Password
        Launch the browser.
        Navigate to the login page URL.
        Verify that the login page is displayed successfully.
        Enter Username: practice.
        Enter an incorrect Password (e.g., WrongPassword).
        Click the Login button.
        Verify that an error message "Invalid password." is displayed.
        Ensure the user remains on the login page.
    */

    test('Verify login with invalid password fails', async ({ page }) => {
        const loginPage = new LoginPage(page, cfg);
        await loginPage.login(users.invalidPasswordUser.name, users.invalidPasswordUser.password);
        await expect(loginPage.page).toHaveURL(loginPage.url);
        await expect(loginPage.invalidPasswordTextArea).toBeVisible();
    });

});
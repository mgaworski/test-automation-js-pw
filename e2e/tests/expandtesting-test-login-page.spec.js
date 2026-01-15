import { test, expect } from '@playwright/test';
const cfg = require('../utilities/loadEnv');
const { loadData } = require('../utilities/loadData');
import { LoginPage } from '../pages/login.page.js';
import { SecureAreaPage } from '../pages/secure-area.page.js';

const users = loadData('users');

test.describe('Expand testing #2 - test login page', () => {

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
   
        test('Test Case 1: Successful Login', async ({page}) => {
            const loginPage = new LoginPage(page, cfg);
            await loginPage.open();
            await loginPage.login(users.validUser.name, users.validUser.password);
            const secureAreaPage = new SecureAreaPage(page, cfg);
            await expect(secureAreaPage.confirmationTextArea).toBeVisible();
            await expect(secureAreaPage.page).toHaveURL(secureAreaPage.url);
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

        test('Test Case 2: Invalid Username', async ({page}) => {
            const loginPage = new LoginPage(page, cfg);
            await loginPage.open();
            await loginPage.login(users.invalidNameUser.name, users.invalidNameUser.password);
            await expect(loginPage.invalidUsernameTextArea).toBeVisible();
            await expect(loginPage.page).toHaveURL(loginPage.url);
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

        test('Test Case 3: Invalid Password', async ({page}) => {
            const loginPage = new LoginPage(page, cfg);
            await loginPage.open();
            await loginPage.login(users.invalidPasswordUser.name, users.invalidPasswordUser.password);
            await expect(loginPage.invalidPasswordTextArea).toBeVisible();
            await expect(loginPage.page).toHaveURL(loginPage.url);
        });

});
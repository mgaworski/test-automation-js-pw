import { test, expect } from '@playwright/test';
import { LocatorsPage } from '../../pages/expandtesting/locators.page';

const cfg = require('../../../utilities/loadEnvHelper');

test.describe("Expand testing #8 - various ways of building a locator", () => {

    test.beforeEach(async ({ page }) => {
        const locatorsPage = new LocatorsPage(page, cfg);
        await locatorsPage.open();
    });

    test("Verify getByRole locators", async ({ page }) => {
        const locatorsPage = new LocatorsPage(page, cfg);
        await expect(locatorsPage.addItemButton).toHaveCount(1);
        await expect(locatorsPage.contactLink).toHaveCount(1);
    });

    test("Verify getByText locators", async ({ page }) => {
        const locatorsPage = new LocatorsPage(page, cfg);
        await expect(locatorsPage.hotDealBanner).toHaveCount(1);
        await expect(locatorsPage.mutedMessage).toHaveCount(1);
    });

    test("Verify getByLabel locators", async ({ page }) => {
        let country = 'Japan';
        let mail = "somebody@somewhere.com"
        const locatorsPage = new LocatorsPage(page, cfg);
        await locatorsPage.selectCountry(country);
        await expect(locatorsPage.countryDropdown).toHaveValue(country);
        await locatorsPage.subscribeToNewsletter(mail);
        await expect(locatorsPage.emailForNewsletterInput).toHaveValue(mail);
    });

    test("Verify getByPlaceholder locators", async ({ page }) => {
        const locatorsPage = new LocatorsPage(page, cfg);
        let searchTerm = "I am looking for something important";
        let tag = "TAG1";
        await locatorsPage.searchSite(searchTerm);
        await expect(locatorsPage.searchSiteInput).toHaveValue(searchTerm);
        await locatorsPage.filterByTag(tag);
        await expect(locatorsPage.filterByTagInput).toHaveValue(tag);
    });

    test("Verify getByAltText locators", async ({ page }) => {
        const locatorsPage = new LocatorsPage(page, cfg);
        await expect(locatorsPage.avatarImage).toHaveCount(1);
    });

    test("Verify getByTitle locators", async ({ page }) => {
        const locatorsPage = new LocatorsPage(page, cfg);
        await expect(locatorsPage.reloadButton).toHaveCount(1);
        await expect(locatorsPage.settingsLabel).toHaveCount(1);
    });

    test("Verify getByTestId locators", async ({ page }) => {
        const locatorsPage = new LocatorsPage(page, cfg);
        await expect(locatorsPage.operationalBanner).toHaveCount(1);
        await expect(locatorsPage.usernameLabel).toHaveCount(1);
    });

    test("Verify CSS locators", async ({ page }) => {
        const locatorsPage = new LocatorsPage(page, cfg);
        await expect(locatorsPage.legacyCSSTarget).toHaveText(locatorsPage.legacyCSSTargetText);

    });

    test("Verify XPath locators - subsequent rows", async ({ page }) => {
        const locatorsPage = new LocatorsPage(page, cfg);
        const xpathListContent = [ 
            "Task 1: Review",
            "Task 2: Implement",
            "Task 3: Deploy" 
        ];
        for (let i=0; i<xpathListContent.length; i++) {
            await expect(locatorsPage.xpathListRow(i+1)).toHaveText(xpathListContent[i]);
        }
    });

    test("Verify XPath locators - table cells", async ({ page }) => {
        const locatorsPage = new LocatorsPage(page, cfg);
        // Headphones
        await expect(locatorsPage.xpathTableCell("Product", 1)).toHaveText("Headphones");
        await expect(locatorsPage.xpathTableCell("Status", 1)).toHaveText("Available");
        await expect(locatorsPage.xpathTableCell("Stock", 1)).toHaveText("12");
        // Monitor
        await expect(locatorsPage.xpathTableCell("Product", 2)).toHaveText("Monitor");
        await expect(locatorsPage.xpathTableCell("Status", 2)).toHaveText("Out of stock");
        await expect(locatorsPage.xpathTableCell("Stock", 2)).toHaveText("0");
        // Keyboard
        await expect(locatorsPage.xpathTableCell("Product", 3)).toHaveText("Keyboard");
        await expect(locatorsPage.xpathTableCell("Status", 3)).toHaveText("Available");
        await expect(locatorsPage.xpathTableCell("Stock", 3)).toHaveText("5");
    });

});

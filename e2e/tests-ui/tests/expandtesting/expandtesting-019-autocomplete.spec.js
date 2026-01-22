import { test, expect } from '@playwright/test';
import { AutocompletePage } from '../../pages/expandtesting/autocomplete.page';

const cfg = require('../../../utilities/loadEnvHelper');

test.describe("Expand testing #19 - Autocomplete", () => {

    test.beforeEach(async ({ page }) => {
        const autocompletePage = new AutocompletePage(page, cfg);
        await autocompletePage.open();
        await expect(autocompletePage.countryInput).toBeVisible({ timeout: 15000 });
    });

    test("Verify autocomplete gradually filters values.", async ({ page }) => {
        const autocompletePage = new AutocompletePage(page, cfg);
        await autocompletePage.type("Po");
        await expect(autocompletePage.countryOption("Poland")).toBeAttached();
        await expect(autocompletePage.countryOption("Portugal")).toBeAttached();
        await expect(autocompletePage.countryOptions).toHaveCount(2);
        await autocompletePage.type("l");
        await expect(autocompletePage.countryOption("Poland")).toBeAttached();
        await expect(autocompletePage.countryOptions).toHaveCount(1);
        await autocompletePage.countryInput.type("and");
        await autocompletePage.submitButton.click();
        await expect(autocompletePage.submitResultsText).toHaveText("You selected: Poland");
    });

    test("Verify autocomplete empty results.", async ({ page }) => {
        const autocompletePage = new AutocompletePage(page, cfg);
        await autocompletePage.type("Po");
        await expect(autocompletePage.countryOption("Poland")).toBeAttached();
        await expect(autocompletePage.countryOption("Portugal")).toBeAttached();
        await expect(autocompletePage.countryOptions).toHaveCount(2);
        await autocompletePage.type("l");
        await expect(autocompletePage.countryOption("Poland")).toBeAttached();
        await expect(autocompletePage.countryOptions).toHaveCount(1);
        await autocompletePage.type("y");
        await expect(autocompletePage.countryOptions).toHaveCount(0);
    });

});
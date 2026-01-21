import { test, expect } from '@playwright/test';
import { AutocompletePage } from '../../pages/expandtesting/autocomplete.page';

const cfg = require('../../utilities/loadEnvHelper');

test.describe("Expand testing #19 - Autocomplete", () => {

    test.only("Verify autocomplete gradually filters values.", async ({ page }) => {
        const autocompletePage = new AutocompletePage(page, cfg);
        await autocompletePage.open();
        await expect(autocompletePage.countryInput).toBeVisible({ timeout: 15000 });
        await autocompletePage.type("Po");
        // await expect(autocompletePage.countryOption("Poland")).toBeVisible();
        // await expect(autocompletePage.countryOption("Portugal")).toBeVisible();
    });

});
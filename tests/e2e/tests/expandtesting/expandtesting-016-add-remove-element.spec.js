import { test, expect } from '@playwright/test';
import { AddRemoveElementsPage } from '../../pages/expandtesting/add-remove-elements.page';

const cfg = require('../../utilities/loadEnvHelper');

test.describe("Expand testing #16  - Add/Remove elements", () => {

    test("Verify adding and removing button.", async ({ page }) => {
        const addRemoveElementsPage = new AddRemoveElementsPage(page, cfg);
        await addRemoveElementsPage.open();
        await expect(addRemoveElementsPage.addButton).toHaveCount(1);
        await expect(addRemoveElementsPage.deleteButton).toHaveCount(0);
        await addRemoveElementsPage.add();
        await expect(addRemoveElementsPage.addButton).toHaveCount(1);
        await expect(addRemoveElementsPage.deleteButton).toHaveCount(1);
        await addRemoveElementsPage.delete();
        await expect(addRemoveElementsPage.addButton).toHaveCount(1);
        await expect(addRemoveElementsPage.deleteButton).toHaveCount(0);
    });

});
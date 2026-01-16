import { test, expect } from '@playwright/test';
import { DynamicTablePage } from '../../pages/expandtesting/dynamic-table.page';

const cfg = require('../../utilities/loadEnvHelper');

test.describe("", () => {

    test.only("Verify chrome CPU value in table matches CPU Value in label", async ({ page }) => {
        const dynamicTablePage = new DynamicTablePage(page, cfg);
        await dynamicTablePage.open();
        await expect(dynamicTablePage.chromeCPULabel).toBeVisible();
        await expect(dynamicTablePage.chromeCPUTable).toBeVisible();
        const chromeCPULabelValue = (await dynamicTablePage.chromeCPULabel.innerText()).replace("Chrome CPU:", "").trim();
        const chromeCPUTableValue = (await dynamicTablePage.chromeCPUTable.innerText()).trim();
        await expect(chromeCPULabelValue).toBe(chromeCPUTableValue);
    });

});
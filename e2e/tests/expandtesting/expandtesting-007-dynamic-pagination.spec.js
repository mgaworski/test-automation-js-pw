import { test, expect } from '@playwright/test';
import { DynamicPaginationTablePage } from '../../pages/expandtesting/dynamic-pagination-table.page';

const cfg = require('../../utilities/loadEnvHelper');
const { loadData } = require('../../utilities/loadDataHelper');

test.describe("", () => {

    test.beforeEach(async ({ page }) => {
        const dynamicPaginationTable = new DynamicPaginationTablePage(page, cfg);
        await dynamicPaginationTable.open();
    });

    const sizes = [
        { entries: "3", expected: 3 },
        { entries: "5", expected: 5 },
        { entries: "10", expected: 10 },
        { entries: "All", expected: 10 }
    ];

    sizes.forEach(({ entries, expected }) => {
        test(`Verify that row number is configurable - ${entries}`, async ({ page }) => {
            const dynamicPaginationTable = new DynamicPaginationTablePage(page, cfg);
            await dynamicPaginationTable.setTableEntrySize(entries);
            await expect(dynamicPaginationTable.personRows).toHaveCount(expected);
        });
    });

    test("Verify that next page can be selected", async ({ page }) => {

    });

    test("Verify that previous page can be selected", async ({ page }) => {

    });

    test("Verify that page can be picked by clicking on a given number", async ({ page }) => {

    });

    test("Verify that search filters values properly", async ({ page }) => {

    });

    test("Verify that empty search result is shown properly", async ({ page }) => {

    });

});

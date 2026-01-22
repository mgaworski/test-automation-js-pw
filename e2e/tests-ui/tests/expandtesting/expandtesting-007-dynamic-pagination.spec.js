import { test, expect } from '@playwright/test';
import { DynamicPaginationTablePage } from '../../pages/expandtesting/dynamic-pagination-table.page';

const cfg = require('../../../utilities/loadEnvHelper');
const { loadData } = require('../../../utilities/loadDataHelper');

const students = loadData('students');

test.describe("Expand testing #7 - test pagination, sorting and searching in table", () => {

    test.beforeEach(async ({ page }) => {
        const dynamicPaginationTablePage = new DynamicPaginationTablePage(page, cfg);
        await dynamicPaginationTablePage.open();
    });

    const sizes = [
        { entries: "3", expected: 3 },
        { entries: "5", expected: 5 },
        { entries: "10", expected: 10 },
        { entries: "All", expected: 10 }
    ];

    sizes.forEach(({ entries, expected }) => {
        test(`Verify that row number is configurable - ${entries}`, async ({ page }) => {
            const dynamicPaginationTablePage = new DynamicPaginationTablePage(page, cfg);
            await dynamicPaginationTablePage.setTableEntrySize(entries);
            await expect(dynamicPaginationTablePage.personRows).toHaveCount(expected);
        });
    });

    test("Verify that next page can be selected", async ({ page }) => {
        const dynamicPaginationTablePage = new DynamicPaginationTablePage(page, cfg);
        await expect(dynamicPaginationTablePage.currentPageButton).toHaveText("1");
        await dynamicPaginationTablePage.nextPageButton.click();
        await expect(dynamicPaginationTablePage.currentPageButton).toHaveText("2");
    });

    test("Verify that previous page can be selected", async ({ page }) => {
        const dynamicPaginationTablePage = new DynamicPaginationTablePage(page, cfg);
        await dynamicPaginationTablePage.goToPage(3);
        await expect(dynamicPaginationTablePage.currentPageButton).toHaveText("3");
        await dynamicPaginationTablePage.previousPageButton.click();
        await expect(dynamicPaginationTablePage.currentPageButton).toHaveText("2");

    });

    test("Verify that page can be picked by clicking on a given number", async ({ page }) => {
        const dynamicPaginationTablePage = new DynamicPaginationTablePage(page, cfg);
        await dynamicPaginationTablePage.goToPage(2);
        await expect(dynamicPaginationTablePage.currentPageButton).toHaveText("2");
        const names = (await dynamicPaginationTablePage.studentNames.allTextContents()).map(t => t.trim());
        expect(names).toEqual(students["page2"]);
    });

    test("Verify that search filters values properly", async ({ page }) => {
        const dynamicPaginationTablePage = new DynamicPaginationTablePage(page, cfg);
        let student = "Bob Williams";
        dynamicPaginationTablePage.search(student);
        await expect(dynamicPaginationTablePage.firstStudentName).toHaveText(student);
        await expect(dynamicPaginationTablePage.studentNames).toHaveCount(1);
    });

    test("Verify that empty search result is shown properly", async ({ page }) => {
        const dynamicPaginationTablePage = new DynamicPaginationTablePage(page, cfg);
        let student = "Wade Wilson";
        dynamicPaginationTablePage.search(student);
        await expect(dynamicPaginationTablePage.firstStudentName).toHaveText(dynamicPaginationTablePage.noStudentsFound);
        await expect(dynamicPaginationTablePage.studentNames).toHaveCount(1);
    });

    const columns = [
        { column: "Student Name", first: "Alice Johnson", last: "Sophia Anderson" },
        { column: "Gender", first: "Alice Johnson", last: "Bob Williams" },
        { column: "Class Level", first: "Bob Williams", last: "Alice Johnson" },
        { column: "Home State", first: "Sophia Anderson", last: "Alice Johnson" },
        { column: "Major", first: "Jane Smith", last: "Daniel Martinez" },
        { column: "Extracurricular Activity", first: "Ethan Thomas", last: "Olivia Wilson" },
    ];

    columns.forEach(({ column, first, last }) => {
        test(`Verify sorting by ${column} column`, async ({ page }) => {
            const dynamicPaginationTablePage = new DynamicPaginationTablePage(page, cfg);
            await dynamicPaginationTablePage.setTableEntrySize("All");
            await expect(dynamicPaginationTablePage.personRows).toHaveCount(10);
            await dynamicPaginationTablePage.column(column).click();
            if (column == "Student Name") {
                await expect(dynamicPaginationTablePage.firstStudentName).toHaveText(last);
            } else {
                await expect(dynamicPaginationTablePage.firstStudentName).toHaveText(first);
            }
            await dynamicPaginationTablePage.column(column).click();
            if (column == "Student Name") {
                await expect(dynamicPaginationTablePage.firstStudentName).toHaveText(first);
            } else {
                await expect(dynamicPaginationTablePage.firstStudentName).toHaveText(last);
            }
        });
    });

});

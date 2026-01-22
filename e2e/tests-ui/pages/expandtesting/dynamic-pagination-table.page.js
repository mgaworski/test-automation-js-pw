import { BasePage } from "../base.page";

export class DynamicPaginationTablePage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}dynamic-pagination-table`;
        // const
        this.noStudentsFound = "No matching records found";
    }

    // locators
    get entriesNumberDropdown() { return this.page.locator("[name='example_length']"); };
    get searchInput() { return this.page.getByLabel("Search:"); };
    get personRows() { return this.page.locator("#demo tr") };
    get previousPageButton() { return this.page.locator("#example_previous"); };
    get nextPageButton() { return this.page.locator("#example_next"); };
    get currentPageButton() { return this.page.locator('a[aria-current="page"]'); };
    get studentNames() { return this.page.locator('#example tbody tr td:first-child') };
    get firstStudentName() { return this.page.locator('#example tbody tr:first-child td:first-child') }

    //dynamic locators
    pageButton(n) { return this.page.locator('#example_paginate').getByRole('link', { name: String(n), exact: true }); };
    column(n) { return this.page.getByText(n); };
    
    // methods
    async setTableEntrySize(c) {
        await this.entriesNumberDropdown.selectOption(c);
    };

    async search(term) {
        await this.searchInput.click();
        await this.searchInput.pressSequentially(term);
        // await this.searchInput.press('Enter');
    };

    async next_page() {
        await this.nextPageButton.click();
    }

    async previous_page() {
        await this.previousPageButton.click();
    }

    async goToPage(n) {
        await this.pageButton(n).click();
    }

}
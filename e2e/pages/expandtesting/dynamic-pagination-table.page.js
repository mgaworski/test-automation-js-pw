import { BasePage } from "../base.page";

export class DynamicPaginationTablePage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}dynamic-pagination-table`;
        // const
    }

    // locators
    get entriesNumberDropdown() { return this.page.locator("[name='example_length']"); };
    get searchInput() { return this.page.getByLabel("Search:"); };
    get personRows() { return this.page.locator("#demo tr") };
    
    // methods
    async setTableEntrySize(c) {
        await this.entriesNumberDropdown.selectOption(c);
    };

    async search(term) {
        await this.search.pressSequentially(term);
    };

}
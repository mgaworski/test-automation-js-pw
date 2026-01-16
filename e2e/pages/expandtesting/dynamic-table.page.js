import { BasePage } from "../base.page";

export class DynamicTablePage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}dynamic-table`;
        // const
    }

    // locators
    get chromeCPULabel() { return this.page.locator('#chrome-cpu'); };
    // get chromeCPUTable() { return this.page.locator('//tr[td[contains(., "Chrome")]]/td[3]'); };
    get chromeCPUTable() { return this.page.locator(`
        //table
            //tr[th[contains(., "CPU")]]/ancestor::table//tr[td[1][contains(., "Chrome")]]/td[count(//th[contains(., "CPU")]/preceding-sibling::th)+1]`); };
    
    // methods

}
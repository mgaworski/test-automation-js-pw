import { BasePage } from "../base.page";

export class MyBrowserInformationPage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}my-browser`;
        // const
    }

    // locators
    get showBrowserInformationButton() { return this.page.locator('#browser-taggle').getByText("Show Browser Information"); };
    get hideBrowserInformationButton() { return this.page.locator('#browser-taggle').getByText("Hide Browser Information"); };
    get browserInfoTable() { return this.page.locator("#browser-info"); };
    
    // methods
    async showBrowserInfo() {
        await this.showBrowserInformationButton.click();
    }

    async hideBrowserInformationButtonBrowserInfo() {
        await this.hideBrowserInformationButton.click();
    }

}
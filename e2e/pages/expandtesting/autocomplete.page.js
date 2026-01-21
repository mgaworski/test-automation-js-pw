import { BasePage } from "../base.page";

export class AutocompletePage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}autocomplete`;
        // const
    }

    // locators
    get countryInput() { return this.page.locator('input#country'); };
    get submitButton() { return this.page.getByRole("button").getByText("Submit"); };

    // dynamic locators
    countryOption(country) { return this.page.locator(`xpath=//input[@value="${country}"]`); };

    // methods
    async type(c) {
        await this.countryInput.click();
        await this.countryInput.type(c);
    }
    
};
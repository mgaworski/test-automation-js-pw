import { BasePage } from "../base.page";

export class RadioButtonsPage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}radio-buttons`;
        // const
    }

    // locators
    
    // dynamic locators
    colorRadioButton(c) { return this.page.locator(`#${c}`); };
    sportRadioButton(s) { return this.page.getByText(s); };

    // methods
    async pickColor(color) {
        await this.colorRadioButton(color).click();
    }

    async pickSport(sport) {
        await this.sportRadioButton(sport).click();
    }


}
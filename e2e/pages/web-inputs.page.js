export class WebInputsPage {

    constructor(page, cfg = {}) {
        this.page = page;
        this.cfg = cfg;
        this.url = `${this.cfg.appURL}inputs`;
        //const
        this.clearInputsText = "Clear Inputs"
        this.displayOutputsText = "Display Inputs" // yeah, logical as f**k...
    }

    //locators - buttons
    get clearInputsButton() { return this.page.getByText(this.clearInputsText); };
    get displayOutputsButton() { return this.page.getByText(this.displayOutputsText); };
    //locators - inputs
    get numberInputField() { return this.page.locator('#input-number'); };
    get textInputField() { return this.page.locator('#input-text'); };
    get passwordInputField() { return this.page.locator('#input-password'); };
    get dateInputField() { return this.page.locator('#input-date'); };
    //locators - outputs
    get numberOutputField() { return this.page.locator('#output-number'); };
    get textOutputField() { return this.page.locator('#output-text'); };
    get passwordOutputField() { return this.page.locator('#output-password'); };
    get dateOutputField() { return this.page.locator('#output-date'); };

    // methods
    async open() {
        await this.page.goto(this.url)
    }

    async clearInputs() {
        await this.clearInputsButton.click();
    }

    async displayOutputs() {
        await this.displayOutputsButton.click();
    }

    async fillNumber(n) {
        await this.numberInputField.fill(n.toString());
    }

    async fillText(t) {
        await this.textInputField.fill(t);
    }

    async fillPassword(p) {
        await this.passwordInputField.fill(p);
    }

    async fillDate(yyyy_mm_dd) {
        await this.dateInputField.fill(yyyy_mm_dd);
    }

}
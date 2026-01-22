import { BasePage } from "../base.page";

export class FormConfirmationPage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}form-confirmation`;
        // const
        this.ticketValidatedText = "Thank you for validating your ticket";
    }

    // locators
    get ticketValidatedMsg() { return this.page.getByText(this.ticketValidatedText); };

}
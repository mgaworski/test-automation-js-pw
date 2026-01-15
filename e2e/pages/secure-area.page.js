import { BasePage } from "./base.page";

export class SecureAreaPage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}secure`;
        // const
        this.loggedText = "You logged into a secure area!";
    }

    // locators
    get logoutButton() { return this.page.locator(".button").getByText("Logout"); ;}
    get confirmationTextArea() { return this.page.getByText(this.loggedText); };

}
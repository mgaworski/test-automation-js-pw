import { BasePage } from "../base.page";

export class ForgotPasswordPage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}forgot-password`;
        // const
        this.mailinatorUrl = "https://www.mailinator.com/v4/public/inboxes.jsp?to=";
        this.invalidMailUsed = "Please enter a valid email address.";
        this.validMailUsed = "An e-mail has been sent to you which explains how to reset your password.";
        this.mailTopic = "[Practice WebSite] Forgot Password Instructions";
    }

    // locators
    get emailInput() { return this.page.locator("#email"); }
    get retrievePasswordButton() { return this.page.getByRole("button").getByText("Retrieve password"); }
    get invalidMailTextArea() { return this.page.getByText(this.invalidMailUsed); }
    get validMailTextArea() { return this.page.getByText(this.validMailUsed); }

    // methods
    async retrieve(email) {
        await this.emailInput.click(); // needed for non chromium browsers as otherwise we do not get focus
        await this.emailInput.fill(email);
        await this.retrievePasswordButton.click();
    }

}
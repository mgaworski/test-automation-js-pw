import { BasePage } from "../base.page";

export class OTPLoginPage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}otp-login`;
        // const
        this.invalidMailUsed = "Please enter a valid email address.";
    }

    // locators
    get emailInput() { return this.page.locator("#email"); }
    get getOTPCodeButton() { return this.page.getByRole("button").getByText("Send OTP Code"); }
    get invalidMailTextArea() { return this.page.getByText(this.invalidMailUsed); }

    // methods
    async getOTP(email) {
        await this.emailInput.click(); // needed for non chromium browsers as otherwise we do not get focus
        await this.emailInput.fill(email);
        await this.getOTPCodeButton.click();
    }

}
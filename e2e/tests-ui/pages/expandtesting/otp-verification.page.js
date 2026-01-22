import { BasePage } from "../base.page";

export class OTPVerificationPage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}otp-login`;
        // const
        this.otpSent = "We've sent an OTP code to your email:";
        this.incorrectOTP = "The provided OTP code is incorrect. Please check your code and try again."
    }

    // locators
    get otpInput() { return this.page.locator("#otp"); }
    get verifyOTPCodeButton() { return this.page.getByRole("button").getByText("Verify OTP Code"); }
    get otpSentTextArea() { return this.page.getByText(this.otpSent); }
    get incorrectOTPTextArea() { return this.page.getByText(this.incorrectOTP); }

    // methods
    async verifyOTP(otp) {
        await this.otpInput.click(); // needed for non chromium browsers as otherwise we do not get focus
        await this.otpInput.fill(otp);
        await this.verifyOTPCodeButton.click();
    }

}
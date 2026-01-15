import { BasePage } from "./base.page";

export class RegisterPage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}register`;
        // const
        this.registrationError = "An error occurred during registration. Please try again."
        this.passwordShort = "Password must be at least 4 characters long."
        this.passwordsMismatch = "Passwords do not match."
    }

    // locators
    get userNameInput() { return this.page.locator("#username"); };
    get passwordInput() { return this.page.locator("#password"); };
    get passwordConfirmInput() { return this.page.locator("#confirmPassword"); };
    get registerButton() { return this.page.getByRole("button").getByText("Register"); };
    get registrationErrorTextArea() { return this.page.getByText(this.registrationError); }
    get passwordShortTextArea() { return this.page.getByText(this.passwordShort); }
    get passwordsMismatchTextArea() { return this.page.getByText(this.passwordsMismatch); }
    

    // methods
    async register(username, passwordA, passwordB) {
        await this.userNameInput.click(); // needed for non chromium browsers as otherwise we do not get focus
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(passwordA);
        await this.passwordConfirmInput.fill(passwordB == null ? passwordA : passwordB);
        await this.registerButton.click();
    }

}
import { BasePage } from "../base.page";

export class LoginPage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}login`;
        // const
        this.invalidPass = "Your password is invalid!";
        this.invalidUser = "Your username is invalid!";
        this.successfulRegistration = "Successfully registered, you can log in now."
    }

    // locators
    get userNameInput() { return this.page.locator("#username"); }
    get passwordInput() { return this.page.locator("#password"); }
    get loginButton() { return this.page.getByRole("button").getByText("Login"); }
    get invalidPasswordTextArea() { return this.page.getByText(this.invalidPass); }
    get invalidUsernameTextArea() { return this.page.getByText(this.invalidUser); }
    get successfulRegistrationTextArea() { return this.page.getByText(this.successfulRegistration); }

    // methods
    async login(username, password) {
        await this.userNameInput.click(); // needed for non chromium browsers as otherwise we do not get focus
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}
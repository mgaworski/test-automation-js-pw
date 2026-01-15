export class LoginPage {

    constructor(page, cfg = {}) {
        this.page = page;
        this.cfg = cfg;
        this.url = `${this.cfg.appURL}login`;
        // const
        this.invalidPass = "Your password is invalid!";
        this.invalidUser = "Your username is invalid!";
    }

    // locators
    get userNameInput() { return this.page.locator("#username"); }
    get passwordInput() { return this.page.locator("#password"); }
    get loginButton() { return this.page.getByRole("button").getByText("Login"); }
    get invalidPasswordTextArea() { return this.page.getByText(this.invalidPass); }
    get invalidUsernameTextArea() { return this.page.getByText(this.invalidUser); }

    // methods
    async open() {
        await this.page.goto(this.url)
    }

    async login(username, password) {
        await this.userNameInput.click(); // needed for non chromium browsers as otherwise we do not get focus
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}
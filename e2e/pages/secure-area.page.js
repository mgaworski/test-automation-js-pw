export class SecureAreaPage {

    constructor(page, cfg = {}) {
        this.page = page;
        this.cfg = cfg;
        this.url = `${this.cfg.appURL}secure`;
        // const
        this.loggedText = "You logged into a secure area!";
    }

    get logoutButton() {
        return this.page.locator(".button").getByText("Logout");
    }

    get confirmationTextArea() {
        return this.page.getByText(this.loggedText);
    }

    async open() {
        await this.page.goto(this.url)
    }

}
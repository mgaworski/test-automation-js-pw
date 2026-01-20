import { BasePage } from "../base.page";

export class NotificationMessagePage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}notification-message-rendered`;
    }

    // locators
    get notificationBanner() { return this.page.locator('#flash'); };
    get clickHereLink() { return this.page.locator("a").getByText("Click here"); } ;
    get closeNotificationX() { return this.page.locator('button[aria-label="Close"]'); };

    // methods
    async getNewNotification() {
        await this.clickHereLink.click();
    }

    async closeNotification() {
        await this.closeNotificationX.click();
    }

}
import { test, expect } from '@playwright/test';
import { NotificationMessagePage } from '../../pages/expandtesting/notification-message.page';

const cfg = require('../../../utilities/loadEnvHelper');

test.describe("Expand testing #18 - Notifications", () => {

    test("Verify notifications dynamically apear in reaction to events", async ({ page }) => {
        const notificationMessagePage = new NotificationMessagePage(page, cfg);
        await notificationMessagePage.open();
        await notificationMessagePage.clickHereLink.click();
        await expect(notificationMessagePage.notificationBanner).toBeVisible();
        await notificationMessagePage.closeNotificationX.click();
        await expect(notificationMessagePage.notificationBanner).not.toBeVisible();
    });

});
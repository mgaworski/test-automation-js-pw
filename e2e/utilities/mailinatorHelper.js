const { chromium } = require('playwright');

const MAILINATOR_URL = 'https://www.mailinator.com/v4/public/inboxes.jsp?to=';

async function checkMailinator(inboxName, mailTopic) {
    const timeoutMs = 60000;
    const pollIntervalMs = 3000;
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const inboxUrl = `${MAILINATOR_URL}${encodeURIComponent(inboxName)}`;
    const start = Date.now();

    try {
        while (Date.now() - start < timeoutMs) {
            await page.goto(inboxUrl, { waitUntil: 'domcontentloaded' });
            await page.waitForTimeout(1500);
            
            const rows = page.locator('table tr');
            const rowCount = await rows.count();

            for (let i = 0; i < rowCount; i++) {
                const row = rows.nth(i);
                const subjectCell = row.locator('td').nth(2); // 3rd column -> mail topic

                if (await subjectCell.count()) {
                    const text = (await subjectCell.innerText()).trim();

                    if (text.includes(mailTopic)) {
                        return true;
                    }
                }
            }

            await page.waitForTimeout(pollIntervalMs);
        }

        return false;
    } finally {
        await browser.close();
    }
}

module.exports = { checkMailinator };
import { BasePage } from "../base.page";

export class FileDownloaderPage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}download`;
    }

    // locators

    // dynamic locators
    downloadLink(file) { return this.page.getByTestId(file); };

    // methods
    async download(file) {
       const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.downloadLink(file).click()
        ]); 

        return download;
    };

}
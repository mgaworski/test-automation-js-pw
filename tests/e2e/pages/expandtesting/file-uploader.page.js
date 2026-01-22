import { BasePage } from "../base.page";

export class FileUploaderPage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}upload`;

        this.fileUploadedText = "File Uploaded!";
    }

    // locators
    get fileInput() { return this.page.locator('input#fileInput'); };
    get uploadButton() { return this.page.locator("button#fileSubmit"); };
    get fileUploadedMsg() { return this.page.locator("h1").getByText(this.fileUploadedText); };
    get fileUploadedList() { return this.page.locator('#uploaded-files'); };

    // methods
    async upload(file) {
        await this.fileInput.setInputFiles(file);
        await this.uploadButton.click();
    }

}
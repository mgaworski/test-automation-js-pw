import { BasePage } from "../base.page";

export class JavaScriptDialogsPage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}js-dialogs`;
    }

    // locators
    get jsAlertButton() { return this.page.getByRole("button").getByText("Js Alert"); };
    get jsConfirmButton() { return this.page.getByRole("button").getByText("Js Confirm"); };
    get jsPromptButton() { return this.page.getByRole("button").getByText("Js Prompt"); };
    get dialogResponseText() { return this.page.locator("#dialog-response"); };

    // methods
    async alert() {
        this.page.on('dialog', dialog => dialog.accept());
        await this.jsAlertButton.click();
    };

    async confirmCancel() {
        this.page.on('dialog', dialog => dialog.dismiss());
        await this.jsConfirmButton.click();
    };

    async confirmAccept() {
        this.page.on('dialog', dialog => dialog.accept());
        await this.jsConfirmButton.click();
    };

    async promptCancel() {
        this.page.on('dialog', dialog => dialog.dismiss());
        await this.jsPromptButton.click();
    };

    async promptEnter(prompt) {
        this.page.on('dialog', dialog => dialog.accept(prompt));
        await this.jsPromptButton.click();
    };

};
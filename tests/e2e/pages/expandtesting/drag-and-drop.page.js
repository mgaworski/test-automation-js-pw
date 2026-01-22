import { BasePage } from "../base.page";

export class DragAndDropPage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}drag-and-drop`;
        // const
        
    }

    // locators
    get leftBox() { return this.page.locator("#column-a"); };
    get rightBox() { return this.page.locator("#column-b"); };

    // methods
    async dragLeftToRight() {
        await this.leftBox.dragTo(this.rightBox);
    }

}
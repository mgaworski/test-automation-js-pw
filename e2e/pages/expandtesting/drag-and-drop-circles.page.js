import { BasePage } from "../base.page";

export class DragAndDropCirclesPage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}drag-and-drop-circles`;
        // const
        
    }

    // locators
    get target() { return this.page.locator("#target"); };
    get redDot() { return this.page.locator("//div[@id='source']/div[contains(@class, 'red')]"); };
    get greenDot() { return this.page.locator("//div[@id='source']/div[contains(@class, 'green')]"); };
    get blueDot() { return this.page.locator("//div[@id='source']/div[contains(@class, 'blue')]"); };
    
    // dynamic locators
    colorStripe(position) { return this.page.locator(`//div[@id="target"]/div[${position}]`)};
    
    // methods
    async dragRed() {
        await this.redDot.dragTo(this.target);
    }

    async dragGreen() {
        await this.greenDot.dragTo(this.target);
    }

    async dragBlue() {
        await this.blueDot.dragTo(this.target);
    }

}
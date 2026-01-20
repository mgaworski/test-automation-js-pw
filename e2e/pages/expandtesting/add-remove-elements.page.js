import { BasePage } from "../base.page";

export class AddRemoveElementsPage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}add-remove-elements`;
        // const
    }

    // locators
    get addButton() { return this.page.getByRole("button").getByText("Add Element"); };
    get deleteButton() { return this.page.getByRole("button").getByText("Delete"); };
    
    // methods
    async add() {
        await this.addButton.click();
    };

    async delete() {
        await this.deleteButton.click();
    };
    
};
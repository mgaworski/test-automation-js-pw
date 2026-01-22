import { BasePage } from "../base.page";

export class FormValidationPage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}form-validation`;
        // const
        this.invalidContactNameText = "Please enter your Contact name.";
        this.invalidContactNumberText = "Please provide your Contact number.";
        this.invalidPickUpDateText = "Please provide valid Date.";
        this.invalidPaymentMethodText = "Please select the Paymeny Method.";
        this.paymentCashOnDelivery = "cash on delivery";
        this.paymentCard = "card";
    }

    // locators
    get contactNameInputField() { return this.page.locator("[name='ContactName']"); };
    get contactNumberInput() { return this.page.locator("[name='contactnumber']"); };
    get pickUpDateInput() { return this.page.locator("[name='pickupdate']"); };
    get paymentMethodDropBox() { return this.page.locator("[name='payment']"); };
    get registerButton() { return this.page.getByRole("button").getByText("Register"); };
    get invalidContactNameMsg() { return this.page.getByText(this.invalidContactNameText); };
    get invalidContactNumberMsg() { return this.page.getByText(this.invalidContactNumberText); };
    get invalidPickUpDateMsg() { return this.page.getByText(this.invalidPickUpDateText); };
    get invalidPaymentMethodMsg() { return this.page.getByText(this.invalidPaymentMethodText); };

    // methods
    async fillForm(name, number, date, payment) {
        await this.contactNameInputField.click();
        await this.contactNameInputField.fill(name);
        await this.contactNumberInput.click();
        await this.contactNumberInput.fill(number);
        if (date!=null) {
            await this.pickUpDateInput.fill(date);
        };
        if (payment!=null) {
            await this.paymentMethodDropBox.selectOption(payment);
        };
        await this.registerButton.click();
    };

}
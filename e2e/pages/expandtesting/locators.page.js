import { BasePage } from "../base.page";

export class LocatorsPage extends BasePage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}locators`;
        // const
        this.addItemButtonText = "Add Item";
        this.contactLinkText = "Contact";
        this.hotDealBannerText = " Hot Deal: Buy 1 Get 1 Free";
        this.mutedMessageText = "Latest news and updates";
        this.countryDropdownLabel = "Choose a country";
        this.emailForNewsletterInputLabel = "Email for newsletter";
        this.searchSiteInputPlaceholder = "Search the site";
        this.filterByTagInputPlaceholder = "Filter by tag";
        this.legacyCSSTargetText = "This is a legacy CSS target";
    }

    // locators
    // getByRole
    get addItemButton() { return this.page.getByRole("button").getByText(this.addItemButtonText); };
    get contactLink() { return this.page.getByRole("link").getByText(this.contactLinkText); };
    // getByText
    get hotDealBanner() { return this.page.getByText(this.hotDealBannerText); };
    get mutedMessage() { return this.page.getByText(this.hotDealBannerText); };
    // getByLabel
    get countryDropdown() { return this.page.getByLabel(this.countryDropdownLabel); };
    get emailForNewsletterInput() { return this.page.getByLabel(this.emailForNewsletterInputLabel); };
    // getByPlaceholder
    get searchSiteInput() { return this.page.getByPlaceholder(this.searchSiteInputPlaceholder); };
    get filterByTagInput() { return this.page.getByPlaceholder(this.filterByTagInputPlaceholder); };
    // getByAltText
    get avatarImage() { return this.page.getByAltText("User avatar"); };
    // getByTitle
    get reloadButton() { return this.page.getByTitle("Refresh content"); };
    get settingsLabel() { return this.page.getByTitle("Settings panel"); };
    // getByTestId
    get operationalBanner() { return this.page.getByTestId("status-message"); };
    get usernameLabel() { return this.page.getByTestId("user-name"); };
    // CSS Selector
    get legacyCSSTarget() { return this.page.locator(".text-primary"); };

    //dynamic locators
    // XPath locators
    xpathListRow(n) { return this.page.locator(`//ul[contains(@class, "legacy-list")]/li[${n}]`); };
    xpathTableCell(c, r) {
        return this.page.locator(
            `//table[contains(@class,"legacy-table")]
                //tbody/tr[${r}]
                    /td[count(
                        //table[contains(@class,"legacy-table")]
                        //th[normalize-space()="${c}"]
                        /preceding-sibling::th
                    ) + 1
                    ]`
        );
    };

    //methods
    async selectCountry(c) {
        await this.countryDropdown.selectOption(c);
    }

    async subscribeToNewsletter(m) {
        await this.emailForNewsletterInput.click();
        await this.emailForNewsletterInput.fill(m);
    }

    async searchSite(t) {
        await this.searchSiteInput.click();
        await this.searchSiteInput.fill(t);
    }

    async filterByTag(t) {
        await this.filterByTagInput.click();
        await this.filterByTagInput.fill(t);
    }

}
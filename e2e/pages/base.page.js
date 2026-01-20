export class BasePage {

    constructor(page, cfg = {}) {
        if (new.target === BasePage) {
            throw new Error('BasePage is abstract — extend it!');
        }
        this.page = page;
        this.cfg = cfg;
        this.url = "";
    }

    async open() {
        await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    }

    async open_auth(user, pass) {
        const ahdr = 'Basic '+ btoa(user +':'+ pass);
        this.page.setExtraHTTPHeaders({Authorization : ahdr});
        this.open();
    }

}
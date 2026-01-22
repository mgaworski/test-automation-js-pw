import { FileDownloaderPage } from "./file-downloader.page";

export class SecureFileDownloaderPage extends FileDownloaderPage {

    constructor(page, cfg = {}) {
        super(page, cfg);
        this.url = `${this.cfg.appURL}download-secure`;

        this.user = 'admin';
        this.pass = 'admin';
    };
};
import { BaseClient } from '../baseClient.js';

export class IpifyClient extends BaseClient {
  constructor(request, cfg = {}) {
    super(request, cfg);
    this.baseURL = cfg.ipifyURL;
  }

  async getIpText() {
    return this.get('/');
  }

  async getIpJson() {
    return this.get('/?format=json', {
      headers: { Accept: 'application/json' },
    });
  }
}
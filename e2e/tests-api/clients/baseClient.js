export class BaseClient {
    
  constructor(request, cfg = {}) {
    if (new.target === BaseClient) {
      throw new Error('BaseClient is abstract — extend it!');
    }
    this.request = request; // APIRequestContext fixture
    this.cfg = cfg;
    this.baseURL = '';      // set in child
    this.headers = {};      // default headers for this client
  }

  url(path = '') {
    if (/^https?:\/\//i.test(path)) return path;
    return `${this.baseURL}${path}`;
  }

  // Equivalent to BasePage.open_auth(user, pass)
  // Creates a dedicated APIRequestContext with Basic Auth headers for this client.
  async withBasicAuth(user, pass) {
    const token = Buffer.from(`${user}:${pass}`).toString('base64');
    const authHeader = `Basic ${token}`;

    const authContext = await this.request.newContext({
      extraHTTPHeaders: {
        ...this.headers,
        Authorization: authHeader,
      },
    });

    // return a new instance of the same concrete client class
    const client = new this.constructor(authContext, this.cfg);
    client.baseURL = this.baseURL;
    client.headers = { ...this.headers, Authorization: authHeader };

    return client;
  }

  async get(path, options = {}) {
    return this.request.get(this.url(path), {
      ...options,
      headers: { ...this.headers, ...(options.headers ?? {}) },
    });
  }

  async post(path, options = {}) {
    return this.request.post(this.url(path), {
      ...options,
      headers: { ...this.headers, ...(options.headers ?? {}) },
    });
  }

  async put(path, options = {}) {
    return this.request.put(this.url(path), {
      ...options,
      headers: { ...this.headers, ...(options.headers ?? {}) },
    });
  }

  async delete(path, options = {}) {
    return this.request.delete(this.url(path), {
      ...options,
      headers: { ...this.headers, ...(options.headers ?? {}) },
    });
  }
}
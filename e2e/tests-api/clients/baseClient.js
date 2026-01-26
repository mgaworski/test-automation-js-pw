export class BaseClient {
    
  constructor(request, cfg = {}) {
    if (new.target === BaseClient) {
      throw new Error('BaseClient is abstract — extend it!');
    }
    this.request = request; // APIRequestContext fixture
    this.cfg = cfg;
    this.baseURL = '';      // set in child
    this.headers = {};      // default headers for this client
  };

  url(path = '') {
    // console.log(`    REQUESTING -----> ${this.baseURL}${path}`);
    return `${this.baseURL}${path}`;
  };

  async get(path, options = {}) {
    return this.request.get(this.url(path), {
      ...options,
      headers: { ...this.headers, ...(options.headers ?? {}) },
    });
  };

  async post(path, options = {}) {
    return this.request.post(this.url(path), {
      ...options,
      headers: { ...this.headers, ...(options.headers ?? {}) },
    });
  };

  async put(path, options = {}) {
    return this.request.put(this.url(path), {
      ...options,
      headers: { ...this.headers, ...(options.headers ?? {}) },
    });
  };

  async delete(path, options = {}) {
    return this.request.delete(this.url(path), {
      ...options,
      headers: { ...this.headers, ...(options.headers ?? {}) },
    });
  };

}
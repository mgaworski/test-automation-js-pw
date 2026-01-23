export class BaseClient {

    constructor(request, cfg = {}) {
        this.request = request;
        this.baseURL = cfg.baseURL ?? '';
        this.defaultHeaders = cfg.defaultHeaders ?? {};
    }

    async get(path, options = {}) {
        return this.request.get(path, {
            ...options,
            headers: {
                ...this.defaultHeaders,
                ...(options.headers ?? {})
            },
        });
    }

    async getJson(path, options = {}) {
        const res = await this.get(path, {
            ...options,
            headers: {
                accept: 'application/json',
                ...(options.headers ?? {}),
            },
        });

        let json = null;
        try {
            json = await res.json();
        } catch {
            // keep null (some APIs return plain text)
        }

        return { res, json };
    }
}
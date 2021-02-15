import { DEFAULT_REQUEST_OPTIONS, METHOD } from "./HTTPTypes.js";
export const API_HOST = 'https://ya-praktikum.tech';
export const API_VERSION = '/api/v2';
export class HTTPTransport {
    constructor() {
        this.baseUrl = API_HOST + API_VERSION;
        this.allowInterceptors = false;
        this.xhr = new XMLHttpRequest();
        this.get = (url, data = {}) => {
            return this.request(this.baseUrl + url, METHOD.GET, Object.assign(DEFAULT_REQUEST_OPTIONS, { data }));
        };
        this.put = (url, data = {}) => {
            return this.request(this.baseUrl + url, METHOD.PUT, Object.assign(DEFAULT_REQUEST_OPTIONS, { data }));
        };
        this.post = (url, data = {}) => {
            return this.request(this.baseUrl + url, METHOD.POST, Object.assign(DEFAULT_REQUEST_OPTIONS, { data }));
        };
        this.delete = (url, data = {}) => {
            return this.request(this.baseUrl + url, METHOD.DELETE, Object.assign(DEFAULT_REQUEST_OPTIONS, { data }));
        };
        this.request = (url, method, options) => {
            if (this.allowInterceptors && this.requestInterceptor) {
                this.requestInterceptor(Object.assign(options, { url }));
            }
            this.url = url;
            const { headers, queryParams, data, timeout } = options;
            return new Promise((resolve) => {
                this.xhr.open(method, this.withQuery(queryParams));
                if (headers && !(data instanceof FormData)) {
                    Object.keys(headers).forEach(key => {
                        this.xhr.setRequestHeader(key, headers[key]);
                    });
                }
                this.xhr.timeout = timeout;
                this.xhr.withCredentials = true;
                this.xhr.onload = () => {
                    resolve(this.parseXHRResult(this.xhr));
                };
                this.xhr.onabort = () => {
                    resolve(this.errorResponse(this.xhr, 'Request is aborted'));
                };
                this.xhr.onerror = () => {
                    resolve(this.errorResponse(this.xhr, 'Failed to make request'));
                };
                this.xhr.ontimeout = () => {
                    resolve(this.errorResponse(this.xhr, 'Request is timed out'));
                };
                switch (method) {
                    case METHOD.GET:
                        this.xhr.send();
                        break;
                    case METHOD.POST:
                    case METHOD.PUT:
                    case METHOD.DELETE:
                        if (data instanceof FormData) {
                            this.xhr.send(data);
                        }
                        else {
                            this.xhr.send(JSON.stringify(data));
                        }
                        break;
                }
            });
        };
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new HTTPTransport();
        }
        return this.instance;
    }
    queryParams(params = {}) {
        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    }
    parseXHRResult(xhr) {
        let response = {
            url: this.url,
            ok: xhr.status >= 200 && xhr.status < 300,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            data: xhr.responseText,
            json: () => JSON.parse(xhr.responseText)
        };
        if (this.allowInterceptors && this.responseInterceptor) {
            this.responseInterceptor(response);
        }
        return response;
    }
    errorResponse(xhr, message = null) {
        let response = {
            url: this.url,
            ok: false,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            data: xhr.responseText,
            json: () => JSON.parse(message || xhr.statusText)
        };
        if (this.allowInterceptors && this.responseInterceptor) {
            this.responseInterceptor(response);
        }
        return response;
    }
    withQuery(params = {}) {
        const queryString = this.queryParams(params);
        return queryString ? this.url + (this.url.indexOf('?') === -1 ? '?' : '&') + queryString : this.url;
    }
}
//# sourceMappingURL=HTTPTransport.js.map
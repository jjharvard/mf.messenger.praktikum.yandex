import {DEFAULT_REQUEST_OPTIONS, METHOD, RequestOptions, RequestResult} from './HTTPTypes';

export const API_HOST = 'https://ya-praktikum.tech';
export const API_VERSION = '/api/v2';

export class HTTPTransport {
    public static instance: HTTPTransport

    public static getInstance(): HTTPTransport {
        if (!this.instance) {
            this.instance = new HTTPTransport();
        }
        return this.instance;
    }

    baseUrl: string = API_HOST + API_VERSION

    url: string;

    allowInterceptors: boolean = false;

    requestInterceptor: (options: RequestOptions) => void;

    responseInterceptor: (options: RequestResult) => void;

    xhr: XMLHttpRequest = new XMLHttpRequest()

    queryParams(params: object = {}) {
        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k as keyof object]))
            .join('&');
    }

    private parseXHRResult(xhr: XMLHttpRequest): RequestResult {
        const response = {
            url: this.url,
            ok: xhr.status >= 200 && xhr.status < 300,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            data: xhr.responseText,
            json: <T>() => JSON.parse(xhr.responseText) as T
        };
        if (this.allowInterceptors && this.responseInterceptor) {
            this.responseInterceptor(response);
        }
        return response;
    }

    private errorResponse(xhr: XMLHttpRequest, message: string | null = null): RequestResult {
        const response = {
            url: this.url,
            ok: false,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            data: xhr.responseText,
            json: <T>() => JSON.parse(message || xhr.statusText) as T
        };
        if (this.allowInterceptors && this.responseInterceptor) {
            this.responseInterceptor(response);
        }
        return response;
    }

    withQuery(params: object = {}) {
        const queryString = this.queryParams(params);
        return queryString ? this.url + (this.url.indexOf('?') === -1 ? '?' : '&') + queryString : this.url;
    }

    get = (url: string, data: object = {}): Promise<RequestResult> => {
        return this.request(this.baseUrl + url, METHOD.GET, Object.assign(DEFAULT_REQUEST_OPTIONS, {data}));
    };

    put = (url: string, data: object = {}): Promise<RequestResult> => {
        return this.request(this.baseUrl + url, METHOD.PUT, Object.assign(DEFAULT_REQUEST_OPTIONS, {data}));
    };

    post = (url: string, data: object = {}): Promise<RequestResult> => {
        return this.request(this.baseUrl + url, METHOD.POST, Object.assign(DEFAULT_REQUEST_OPTIONS, {data}));
    };

    delete = (url: string, data: object = {}): Promise<RequestResult> => {
        return this.request(this.baseUrl + url, METHOD.DELETE, Object.assign(DEFAULT_REQUEST_OPTIONS, {data}));
    };

    request = (url: string,
                       method: METHOD,
                       options: RequestOptions) => {
        if (this.allowInterceptors && this.requestInterceptor) {
            this.requestInterceptor(Object.assign(options, {url}));
        }
        this.url = url;
        const {headers, queryParams, data, timeout} = options;
        return new Promise<RequestResult>((resolve) => {
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
                    } else {
                        this.xhr.send(JSON.stringify(data));
                    }
                    break;
            }
        });
    };
}

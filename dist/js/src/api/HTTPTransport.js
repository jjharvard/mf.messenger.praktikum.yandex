var METHOD;
(function (METHOD) {
    METHOD["GET"] = "GET";
    METHOD["PUT"] = "PUT";
    METHOD["POST"] = "POST";
    METHOD["DELETE"] = "DELETE";
})(METHOD || (METHOD = {}));
;
export const DEFAULT_REQUEST_OPTIONS = {
    headers: {
        'Content-Type': 'application/json'
    },
    queryParams: {},
    timeout: 5000,
    data: {}
};
export class HTTPTransport {
    constructor(xhr = new XMLHttpRequest()) {
        this.get = (url, options) => {
            return this.request(url, METHOD.GET, options);
        };
        this.put = (url, options) => {
            return this.request(url, METHOD.PUT, options);
        };
        this.post = (url, options) => {
            return this.request(url, METHOD.POST, options);
        };
        this.delete = (url, options) => {
            return this.request(url, METHOD.DELETE, options);
        };
        this.request = (url, method, options) => {
            const { headers, queryParams, data, timeout } = Object.assign(DEFAULT_REQUEST_OPTIONS, options);
            let request = {
                method: method,
                payload: data,
                timeout: timeout
            };
            console.log(`${url} => `, JSON.stringify(request));
            return new Promise((resolve) => {
                this.xhr.open(method, this.withQuery(url, queryParams));
                if (headers) {
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
                        this.xhr.send(JSON.stringify(data));
                        break;
                    case METHOD.DELETE:
                        this.xhr.send();
                        break;
                }
            });
        };
        this.xhr = xhr;
    }
    queryParams(params = {}) {
        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    }
    parseXHRResult(xhr) {
        console.log(xhr.status, ' <= ', xhr.responseText);
        return {
            ok: xhr.status >= 200 && xhr.status < 300,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            data: xhr.responseText,
            json: () => JSON.parse(xhr.responseText)
        };
    }
    errorResponse(xhr, message = null) {
        console.log(xhr.status, ' <= ', xhr.responseText);
        return {
            ok: false,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            data: message || xhr.statusText,
            json: () => JSON.parse(message || xhr.statusText)
        };
    }
    withQuery(url, params = {}) {
        const queryString = this.queryParams(params);
        return queryString ? url + (url.indexOf('?') === -1 ? '?' : '&') + queryString : url;
    }
}
//# sourceMappingURL=HTTPTransport.js.map
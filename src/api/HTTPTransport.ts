enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
};

export interface RequestOptions {
    data: object,
    timeout: number,
    url: string
}

export class HTTPTransport {

    queryStringify(data) {
        return "?" + Object.keys(data).map(key => key + '=' + data[key]).join('&');
    }

    get = (url, options: RequestOptions) => {
        if (typeof options.data === "object") {
            url = url + this.queryStringify(options.data);
        }
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    put = (url, options: RequestOptions) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    post = (url, options: RequestOptions) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    delete = (url, options: RequestOptions) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request = (url, options, timeout = 5000) => {
        const {method, headers, data} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            if (typeof headers === "object") {
                Object.keys(headers).forEach(key => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.timeout = timeout;
            xhr.withCredentials = true;

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            switch (options.method) {
                case METHODS.GET:
                    xhr.send();
                    break;
                case METHODS.POST:
                case METHODS.PUT:
                    xhr.send(JSON.stringify(options.data));
                    break;
                case METHODS.DELETE:
                    xhr.send();
                    break;
            }
        });
    };
}
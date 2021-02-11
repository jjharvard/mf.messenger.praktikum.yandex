enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
};

interface Options {
    headers: { [k: string]: string },
    data: object
}

export class HTTPTransport {

    queryStringify(data: { [k: string]: string }) {
        return "?" + Object.keys(data).map(key => key + '=' + data[key]).join('&');
    }

    get = (url: string, options: Options) => {
        if (options) {
            url = url + this.queryStringify({...options.headers, ...options.data});
        }
        return this.request(url, METHODS.GET, options);
    };

    put = (url: string, options: Options) => {
        return this.request(url, METHODS.PUT, options);
    };

    post = (url: string, options: Options) => {
        return this.request(url, METHODS.POST, options);
    };

    delete = (url: string, options: Options) => {
        return this.request(url, METHODS.DELETE, options);
    };

    request = (url: string, method: METHODS, options: Options, timeout = 5000) => {
        const {headers} = options;

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

            switch (method) {
                case METHODS.GET:
                    xhr.send();
                    break;
                case METHODS.POST:
                case METHODS.PUT:
                    xhr.send(JSON.stringify(options));
                    break;
                case METHODS.DELETE:
                    xhr.send();
                    break;
            }
        });
    };
}
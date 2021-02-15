export enum METHOD {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
};

export interface RequestOptions {
    url: string,
    headers?: { [k: string]: string },
    queryParams?: object,
    data?: object | FormData,
    timeout: number
}

export const DEFAULT_REQUEST_OPTIONS = {
    url: '',
    headers: {
        'Content-Type': 'application/json'
    },
    queryParams: {},
    timeout: 5000,
    data: {}
};

export interface RequestResult {
    ok: boolean;
    url: string,
    status: number;
    statusText: string;
    data: string;
    headers: string;
}
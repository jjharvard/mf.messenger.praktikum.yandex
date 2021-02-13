import {HTTPTransport, HTTPTransportBuilder} from "../abstract/http/HTTPTransport.js";

export const API_HOST = 'https://ya-praktikum.tech';
export const API_VERSION = '/api/v2';

export const client: HTTPTransport = new HTTPTransportBuilder()
    .withBaseUrl(API_HOST + API_VERSION)
    .withXHR(new XMLHttpRequest())
    .allowInterceptors(true)
    .withRequestInterceptor(request => {
        console.log(`${request.url} => `, JSON.stringify(request.data));
    })
    .withResponseInterceptor(response => {
        console.log(`${response.status}  <=  ${response.url}, ${response.data}`);
    })
    .build();
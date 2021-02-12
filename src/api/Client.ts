import {HTTPTransport, HTTPTransportBuilder} from "../abstract/http/HTTPTransport.js";

export const client: HTTPTransport = new HTTPTransportBuilder()
    .withBaseUrl('https://ya-praktikum.tech/api/v2')
    .withXHR(new XMLHttpRequest())
    .allowInterceptors(true)
    .withRequestInterceptor(request => {
        console.log(`${request.url} => `, JSON.stringify(request.data));
    })
    .withResponseInterceptor(response => {
        console.log(`${response.status}  <=  ${response.url}, ${response.data}`);
    })
    .build();
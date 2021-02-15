import { HTTPTransportBuilder } from "../_std/http/HTTPTransport.js";
export const API_HOST = 'https://ya-praktikum.tech';
export const API_VERSION = '/api/v2';
export const client = new HTTPTransportBuilder()
    .withBaseUrl(API_HOST + API_VERSION)
    .withXHR(new XMLHttpRequest())
    .allowInterceptors(false)
    .withRequestInterceptor(request => {
    console.log(`${request.url} => `, JSON.stringify(request.data));
})
    .withResponseInterceptor(response => {
    console.log(`${response.status}  <=  ${response.url}, ${response.data}`);
})
    .build();
//# sourceMappingURL=Client.js.map
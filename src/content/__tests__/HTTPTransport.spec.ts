import {HTTPTransport} from "../HTTPTransport";
import {expect} from 'chai';

const jsdom = require('mocha-jsdom');

describe("HTTPTransport", () => {

    jsdom({
        url: "http://localhost"
    });

    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
    });

    it('should encode query params', () => {
        let transport = new HTTPTransport();
        let res = transport.queryParams({'key1': 'value1?', 'key2': 'значение'});
        expect(res).equal('key1=value1%3F&key2=%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D0%B5');
    });

    it('should append params to url', () => {
        let transport = new HTTPTransport();
        transport.url = 'http://localhost';
        let res = transport.withQuery({'key1': 'value1', 'key2': 'value2'});
        expect(res).equal('http://localhost?key1=value1&key2=value2');
    });

});
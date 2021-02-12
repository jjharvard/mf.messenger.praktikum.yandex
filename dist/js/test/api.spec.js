import { HTTPTransport } from "../src/api/HTTPTransport";
// @ts-ignore
import xhr from "../node_modules/xhr2/lib/xhr2.js";
const user = `{
                      "first_name": "leha13",
                      "second_name": "elka11",
                      "login": "lehaelka1",
                      "email": "lehaelka13@yandex.ru",
                      "password": "password",
                      "phone": "88009001012"
                    }`;
describe("Api", () => {
    it("should send get request", () => {
        let req = new xhr.XMLHttpRequest();
        let obj = JSON.parse(user);
        let client = new HTTPTransport(req);
        client.post('https://ya-praktikum.tech/api/v2/auth/signup', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: obj
        })
            .then(value => console.log(value))
            .catch(err => console.log(err));
    });
    it("should return user info", () => {
        let req = new xhr.XMLHttpRequest();
        let client = new HTTPTransport(req);
        client.get('https://ya-praktikum.tech/api/v2/auth/user', {
            headers: {
                // 'cookie': `uuid=${encodeURIComponent('513052ae-ad53-4ae2-966b-d47a47445943')}; authCookie=${encodeURIComponent('3b41c79f97de507e376d49c5d06b942114133b56%3A1613057398')}`,
                'uuid': `${encodeURIComponent('513052ae-ad53-4ae2-966b-d47a47445943')}`,
                'authCookie': `${encodeURIComponent('3b41c79f97de507e376d49c5d06b942114133b56%3A1613057398')}`,
                'Content-Type': 'application/json'
            }
        }).then(value => console.log(value))
            .catch(value => console.log(value));
    });
});
//# sourceMappingURL=api.spec.js.map
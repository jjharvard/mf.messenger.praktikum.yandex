import { HTTPTransportBuilder } from "../abstract/http/HTTPTransport.js";
export const client = new HTTPTransportBuilder()
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
/*
export class Client {

    static login(login: string = 'lehaelka', password: string = 'password') {
        // document.cookie = name + '=; Max-Age=0'

        let client = new HTTPTransport();
        return client.post('https://ya-praktikum.tech/api/v2/auth/signin', {
            data: {
                login: login,
                password: password
            }
        })
    }

    static getUserInfo() {
        let client = new HTTPTransport();
        client.get('https://ya-praktikum.tech/api/v2/auth/user', {
        })
            .then(value => console.log(value))
            .catch(err => console.log(err));
    }

    static logout() {
        let client = new HTTPTransport();
        return client.post('https://ya-praktikum.tech/api/v2/auth/logout', {
        })
    }

    static userSignUp() {
        const user = `{
                      "first_name": "leha113",
                      "second_name": "elka111",
                      "login": "lehaelka11",
                      "email": "leh1aelka13@yandex.ru",
                      "password": "password",
                      "phone": "88009011012"
                    }`;
        let client = new HTTPTransport();
        let obj = JSON.parse(user);
        client.post('https://ya-praktikum.tech/api/v2/auth/signup', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: obj
        })
            .then(value => console.log(value))
            .catch(err => console.log(err));
    }
}*/
//# sourceMappingURL=Client.js.map
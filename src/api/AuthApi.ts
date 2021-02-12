import {client} from "./Client.js";

export class AuthApi {

    static signIn = (login: string, password: string) =>
        client.post('/auth/signin', {login, password});

    static userInfo = () => client.get('/auth/user');

    static logOut = () => client.post('/auth/logout');

    static signUp = (firstName: string, secondName: string, login: string,
                     email: string, password: string, phone: string) => client.post('/auth/signup', {
        first_name: firstName,
        second_name: secondName,
        login: login,
        email: email,
        password: password,
        phone: phone
    });

}

import { client } from "./Client.js";
export class AuthApi {
}
AuthApi.signIn = (login, password) => client.post('/auth/signin', { login, password });
AuthApi.userInfo = () => client.get('/auth/user');
AuthApi.logOut = () => client.post('/auth/logout');
AuthApi.signUp = (firstName, secondName, login, email, password, phone) => client.post('/auth/signup', {
    first_name: firstName,
    second_name: secondName,
    login: login,
    email: email,
    password: password,
    phone: phone
});
//# sourceMappingURL=AuthApi.js.map
import {client} from "./Client.js";
import {StateUtil} from "../utils/StateUtil.js";

export class AuthApi {

    static signIn = (login: string, password: string) =>
        client.post('/auth/signin', {login, password})
            .then(result => {
                if (result.ok) {
                    StateUtil.setAuthenticated(true);
                }
                return result;
            });

    static userInfo = () => client.get('/auth/user');

    static logOut = () => client.post('/auth/logout')
        .then(result => {
            if (result.ok) {
                StateUtil.setAuthenticated(false);
            }
            return result;
        });

    static signUp = (data: object) => client.post('/auth/signup', data)
        .then(result => {
            if (result.ok) {
                StateUtil.setAuthenticated(true);
            }
            return result;
        });

}

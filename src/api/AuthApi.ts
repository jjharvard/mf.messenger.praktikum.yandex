import {StateUtil} from "../utils/StateUtil";
import {HTTPTransport} from "../content/HTTPTransport";

export class AuthApi {

    static signIn = (data: object) =>
        HTTPTransport.getInstance().post('/auth/signin', data)
            .then(result => {
                if (result.ok) {
                    StateUtil.setAuthenticated(true);
                }
                return result;
            });

    static userInfo = () => HTTPTransport.getInstance().get('/auth/user')
        .then(result => {
            if (result.ok) {
                StateUtil.saveUserProfile(JSON.parse(result.data));
            }
            return result;
        });

    static logOut = () => HTTPTransport.getInstance().post('/auth/logout')
        .then(result => {
            if (result.ok) {
                StateUtil.setAuthenticated(false);
            }
            return result;
        });

    static signUp = (data: object) => HTTPTransport.getInstance().post('/auth/signup', data)
        .then(result => {
            if (result.ok) {
                StateUtil.setAuthenticated(true);
            }
            return result;
        });

}

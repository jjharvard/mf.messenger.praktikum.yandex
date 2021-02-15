import { StateUtil } from "../utils/StateUtil.js";
import { HTTPTransport } from "../content/HTTPTransport.js";
export class AuthApi {
}
AuthApi.signIn = (data) => HTTPTransport.getInstance().post('/auth/signin', data)
    .then(result => {
    if (result.ok) {
        StateUtil.setAuthenticated(true);
    }
    return result;
});
AuthApi.userInfo = () => HTTPTransport.getInstance().get('/auth/user')
    .then(result => {
    if (result.ok) {
        StateUtil.saveUserProfile(JSON.parse(result.data));
    }
    return result;
});
AuthApi.logOut = () => HTTPTransport.getInstance().post('/auth/logout')
    .then(result => {
    if (result.ok) {
        StateUtil.setAuthenticated(false);
    }
    return result;
});
AuthApi.signUp = (data) => HTTPTransport.getInstance().post('/auth/signup', data)
    .then(result => {
    if (result.ok) {
        StateUtil.setAuthenticated(true);
    }
    return result;
});
//# sourceMappingURL=AuthApi.js.map
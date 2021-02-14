import { client } from "./Client.js";
import { StateUtil } from "../utils/StateUtil.js";
export class AuthApi {
}
AuthApi.signIn = (data) => client.post('/auth/signin', data)
    .then(result => {
    if (result.ok) {
        StateUtil.setAuthenticated(true);
    }
    return result;
});
AuthApi.userInfo = () => client.get('/auth/user')
    .then(result => {
    if (result.ok) {
        StateUtil.saveUserProfile(JSON.parse(result.data));
    }
    return result;
});
AuthApi.logOut = () => client.post('/auth/logout')
    .then(result => {
    if (result.ok) {
        StateUtil.setAuthenticated(false);
    }
    return result;
});
AuthApi.signUp = (data) => client.post('/auth/signup', data)
    .then(result => {
    if (result.ok) {
        StateUtil.setAuthenticated(true);
    }
    return result;
});
//# sourceMappingURL=AuthApi.js.map
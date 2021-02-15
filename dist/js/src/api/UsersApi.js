import { StateUtil } from "../utils/StateUtil.js";
import { HTTPTransport } from "../content/HTTPTransport.js";
export class UsersApi {
}
UsersApi.changePassword = (data) => HTTPTransport.getInstance().put('/user/password', data);
UsersApi.saveProfile = (data) => HTTPTransport.getInstance().put('/user/profile', data)
    .then(result => {
    if (result.ok) {
        StateUtil.saveUserProfile(JSON.parse(result.data));
    }
    return result;
});
UsersApi.changeAvatar = (fileList) => HTTPTransport.getInstance().put('/user/profile/avatar', (() => {
    let formData = new FormData();
    formData.append('avatar', fileList[0]);
    return formData;
})())
    .then(result => {
    if (result.ok) {
        StateUtil.saveUserProfile(JSON.parse(result.data));
    }
    return result;
});
UsersApi.findUser = (login) => HTTPTransport.getInstance().post('/user/search', { login });
//# sourceMappingURL=UsersApi.js.map
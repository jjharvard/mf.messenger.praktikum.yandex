import { client } from "./Client.js";
import { StateUtil } from "../utils/StateUtil.js";
export class UsersApi {
}
UsersApi.changePassword = (data) => client.put('/user/password', data);
UsersApi.saveProfile = (data) => client.put('/user/profile', data)
    .then(result => {
    if (result.ok) {
        StateUtil.saveUserProfile(JSON.parse(result.data));
    }
    return result;
});
UsersApi.changeAvatar = (fileList) => client.put('/user/profile/avatar', (() => {
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
UsersApi.findUser = (login) => client.post('/user/search', { login });
//# sourceMappingURL=UsersApi.js.map
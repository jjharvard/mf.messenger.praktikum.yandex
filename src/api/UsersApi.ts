import {client} from "./Client.js";
import {StateUtil} from "../utils/StateUtil.js";

export class UsersApi {

    static changePassword = (data: object) => client.put('/user/password', data);

    static saveProfile = (data: object) => client.put('/user/profile', data)
        .then(result => {
            if (result.ok) {
                StateUtil.saveUserProfile(JSON.parse(result.data));
            }
            return result;
        });

    static changeAvatar = (fileList: FileList) => client.put('/user/profile/avatar', (() => {
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

}
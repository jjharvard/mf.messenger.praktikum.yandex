import {StateUtil} from "../utils/StateUtil";
import {HTTPTransport} from "../content/HTTPTransport";

export class UsersApi {

    static changePassword = (data: object) => HTTPTransport.getInstance().put('/user/password', data);

    static saveProfile = (data: object) => HTTPTransport.getInstance().put('/user/profile', data)
        .then(result => {
            if (result.ok) {
                StateUtil.saveUserProfile(JSON.parse(result.data));
            }
            return result;
        });

    static changeAvatar = (fileList: FileList) => HTTPTransport.getInstance().put('/user/profile/avatar', (() => {
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

    static findUser = (login: string) => HTTPTransport.getInstance().post('/user/search', {login});
}
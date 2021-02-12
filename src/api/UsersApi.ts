import {client} from "./Client.js";

export class UsersApi {

    static changePassword = (data: object) => client.put('/user/password', data);

    static saveProfile = (data: object) => client.put('/user/profile', data);

}
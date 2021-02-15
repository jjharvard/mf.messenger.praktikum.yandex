import {HTTPTransport} from "../content/HTTPTransport";


export class ChatsApi {

    static createChat = (title: string) => HTTPTransport.getInstance().post('/chats', {title});

    static deleteChat = (chatId: number) => HTTPTransport.getInstance().delete('/chats', {chatId});

    static changeAvatar = (id: string, fileList: FileList) => HTTPTransport.getInstance().put('/chats/avatar', (() => {
        let formData = new FormData();
        formData.append('chatId', id);
        formData.append('avatar', fileList[0]);
        return formData;
    })());

    static getChats = () => HTTPTransport.getInstance().get('/chats');

    static addUsers = (userIds: number[], chatId: number) => HTTPTransport.getInstance().put('/chats/users', {
        'users': userIds,
        'chatId': chatId
    });

    static deleteUsers = (userIds: number[], chatId: number) => HTTPTransport.getInstance().delete('/chats/users', {
        'users': userIds,
        'chatId': chatId
    });

    static getUsers = (chatId: number) => HTTPTransport.getInstance().get('/chats/' + chatId + '/users');

}
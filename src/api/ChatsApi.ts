import {client} from "./Client.js";


export class ChatsApi {

    static createChat = (title: string) => client.post('/chats', {title});

    static deleteChat = (chatId: string) => client.delete('/chats', {chatId});

    static changeAvatar = (id: string, fileList: FileList) => client.put('/chats/avatar', (() => {
        let formData = new FormData();
        formData.append('chatId', id);
        formData.append('avatar', fileList[0]);
        return formData;
    })());

    static getChats = () => client.get('/chats');

    static addUsers = (userIds: string[], chatId: string) => client.put('/chats/users', {
        'users': userIds,
        'chatId': chatId
    });

    static deleteUsers = (userIds: string[], chatId: string) => client.delete('/chats/users', {
        'users': userIds,
        'chatId': chatId
    });

}
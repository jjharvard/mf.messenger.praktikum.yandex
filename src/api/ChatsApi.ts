import {client} from "./Client.js";


export class ChatsApi {

    static createChat = (title: string) => client.post('/chats', {title});

    static changeAvatar = (id: string, fileList: FileList) => client.put('/chats/avatar', (() => {
        let formData = new FormData();
        formData.append('chatId', id);
        formData.append('avatar', fileList[0]);
        return formData;
    })());

    static deleteChat = (id: string) => client.delete('/chats', {id})

    static getChats = () => client.get('/chats')

}
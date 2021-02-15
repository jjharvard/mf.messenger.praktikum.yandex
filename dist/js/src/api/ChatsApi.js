import { HTTPTransport } from "../content/HTTPTransport.js";
export class ChatsApi {
}
ChatsApi.createChat = (title) => HTTPTransport.getInstance().post('/chats', { title });
ChatsApi.deleteChat = (chatId) => HTTPTransport.getInstance().delete('/chats', { chatId });
ChatsApi.changeAvatar = (id, fileList) => HTTPTransport.getInstance().put('/chats/avatar', (() => {
    let formData = new FormData();
    formData.append('chatId', id);
    formData.append('avatar', fileList[0]);
    return formData;
})());
ChatsApi.getChats = () => HTTPTransport.getInstance().get('/chats');
ChatsApi.addUsers = (userIds, chatId) => HTTPTransport.getInstance().put('/chats/users', {
    'users': userIds,
    'chatId': chatId
});
ChatsApi.deleteUsers = (userIds, chatId) => HTTPTransport.getInstance().delete('/chats/users', {
    'users': userIds,
    'chatId': chatId
});
ChatsApi.getUsers = (chatId) => HTTPTransport.getInstance().get('/chats/' + chatId + '/users');
//# sourceMappingURL=ChatsApi.js.map
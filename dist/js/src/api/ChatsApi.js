import { client } from "./Client.js";
export class ChatsApi {
}
ChatsApi.createChat = (title) => client.post('/chats', { title });
ChatsApi.deleteChat = (chatId) => client.delete('/chats', { chatId });
ChatsApi.changeAvatar = (id, fileList) => client.put('/chats/avatar', (() => {
    let formData = new FormData();
    formData.append('chatId', id);
    formData.append('avatar', fileList[0]);
    return formData;
})());
ChatsApi.getChats = () => client.get('/chats');
ChatsApi.addUsers = (userIds, chatId) => client.put('/chats/users', {
    'users': userIds,
    'chatId': chatId
});
ChatsApi.deleteUsers = (userIds, chatId) => client.delete('/chats/users', {
    'users': userIds,
    'chatId': chatId
});
ChatsApi.getUsers = (chatId) => client.get('/chats/' + chatId + '/users');
//# sourceMappingURL=ChatsApi.js.map
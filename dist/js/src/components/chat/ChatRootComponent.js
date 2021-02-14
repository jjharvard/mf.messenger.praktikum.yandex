import { ComponentGroup } from "../../abstract/ComponentGroup.js";
import { User } from "./User.js";
import { ChatRoom } from "./ChatRoom.js";
import { Adapter } from "../../abstract/Adapter.js";
import { EditText } from "./EditText.js";
import { UploadButton } from "./UploadButton.js";
import { InputMessage } from "./InputMessage.js";
import { Button } from "./Button.js";
import { ModalBuilder } from "../_common/Modal.js";
import { ChatsApi } from "../../api/ChatsApi.js";
import { SidebarListComponent } from "./lists/SidebarListComponent.js";
import { EventBus } from "../../utils/EventBus.js";
import { UsersModal } from "./lists/users/UsersModal.js";
import { StateUtil } from "../../utils/StateUtil.js";
export class ChatRootComponent extends ComponentGroup {
    constructor() {
        super([
            new User(),
            new SidebarListComponent(),
            new ChatRoom(),
            new EditText([
                new UploadButton(),
                new InputMessage(),
                new Button()
            ]),
            new ModalBuilder()
                .withTitle('Create Chat')
                .withUpload('Choose image on your computer')
                .withInput("create-chat", "create-chat", "create-chat__input", "Chat name", "text")
                .withButton('Submit')
                .build(),
            new ModalBuilder()
                .withTitle('Are you sure?')
                .withButton('Delete')
                .build(),
            new UsersModal('Select User', "User Login", "Add"),
            new UsersModal('Remove Users', 'User Login', 'Remove')
        ]);
        EventBus.getInstance().register('onChatAction', this);
    }
    onViewCreated() {
        let modals = this.getChildComponentsByName('Modal');
        this.modalChatAdd = modals[0];
        this.modalConfirm = modals[1];
        this.sidebarListComponent = this.getChildComponentsByName('SidebarListComponent')[0];
        this.chatRoom = this.getChildComponentsByName('ChatRoom')[0];
        this.user = this.getChildComponentsByName('User')[0];
        this.modalAddUsers = this.getChildComponentsByName('UsersModal')[0];
        this.modalRemoveUsers = this.getChildComponentsByName('UsersModal')[1];
        this.initModal();
        this.getChats();
    }
    onChatAction(payload = {}) {
        let action = payload['action'];
        switch (action) {
            case 'chatRemove':
                if (this.sidebarListComponent.adapter.getItems().length) {
                    this.modalConfirm.onChangedCallback = () => {
                        let activeChat = this.sidebarListComponent.adapter.getItems().filter(item => item.isActive)[0];
                        ChatsApi.deleteChat(activeChat.id)
                            .then(response => {
                            if (response.ok) {
                                this.getChats();
                                this.modalConfirm.hide();
                            }
                        });
                    };
                    this.modalConfirm.show();
                }
                break;
            case 'userAdd':
                if (this.sidebarListComponent.adapter.getItems().length) {
                    this.modalAddUsers.show();
                    this.modalAddUsers.onSubmitCallback = (usersData) => {
                        ChatsApi.addUsers(usersData.map(item => item.id), this.sidebarListComponent.currentItem.chatData.id)
                            .then(response => {
                            if (response.ok) {
                                this.modalAddUsers.hide();
                            }
                        });
                    };
                }
                break;
            case 'userRemove':
                this.sidebarListComponent.adapter.getItems().length && ChatsApi.getUsers(this.sidebarListComponent.currentItem.chatData.id)
                    .then(response => {
                    if (response.ok) {
                        let usersData = JSON.parse(response.data);
                        this.modalRemoveUsers.notifyUserList(usersData);
                        this.modalRemoveUsers.onSubmitCallback = (usersData) => {
                            ChatsApi.deleteUsers(usersData.map(item => item.id), this.sidebarListComponent.currentItem.chatData.id)
                                .then(response => {
                                if (response.ok) {
                                    this.modalRemoveUsers.hide();
                                    let profileData = StateUtil.getUserProfile();
                                    if (!usersData || usersData.length || usersData.some(data => profileData.id === data.id)) {
                                        this.getChats();
                                    }
                                }
                            });
                        };
                    }
                });
                break;
            default:
                return;
        }
    }
    getChats() {
        ChatsApi.getChats().then(response => {
            if (response.ok) {
                let chatData = JSON.parse(response.data);
                if (chatData.length) {
                    chatData[0].isActive = true;
                }
                this.sidebarListComponent.notify(new Adapter(chatData));
            }
        });
    }
    getTemplate() {
        return `<div class="chat-container">
                    {{User}}
                    {{SidebarListComponent}}
                    {{ChatRoom}}
                    {{EditText}}
                    {{Modal}}
                    {{Modal}}
                    {{UsersModal}}
                    {{UsersModal}}
                </div>`;
    }
    getKeys() {
        return {};
    }
    initModal() {
        this.modalChatAdd.onChangedCallback = (files, chatTitle) => {
            if (!files || files.length === 0) {
                this.modalChatAdd.textInput.showMessage('Please, add avatar image');
                return;
            }
            ChatsApi.createChat(chatTitle)
                .then(response => {
                if (response.ok) {
                    let chatId = JSON.parse(response.data)['id'];
                    ChatsApi.changeAvatar(chatId, files)
                        .then(_ => {
                        this.modalChatAdd.hide();
                        this.modalChatAdd.clear();
                        this.getChats();
                    });
                }
                else {
                    this.modalChatAdd.textInput.showMessage(JSON.parse(response.data)['reason']);
                }
            });
        };
        this.user.btnAddChat.onclick = () => this.modalChatAdd.show();
    }
}
//# sourceMappingURL=ChatRootComponent.js.map
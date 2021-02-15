import {ComponentGroup} from "../../content/ComponentGroup";
import {User} from "./User";
import {ChatRoom} from "./ChatRoom";
import {Adapter} from "../../content/Adapter";
import {EditText} from "./EditText";
import {UploadButton} from "./UploadButton";
import {InputMessage} from "./InputMessage";
import {Modal, ModalBuilder} from "../_common/Modal";
import {ChatsApi} from "../../api/ChatsApi";
import {SidebarListComponent} from "./lists/SidebarListComponent";
import {ChatData, UserData} from "../../content/StorageTypes";
import {EventBus} from "../../utils/EventBus";
import {UsersModal} from "./lists/users/UsersModal";
import {StateUtil} from "../../utils/StateUtil";
import {Button} from "../_common/Button";

export class ChatRootComponent extends ComponentGroup {

    modalChatAdd: Modal;
    modalConfirm: Modal;
    chatRoom: ChatRoom;
    user: User;
    sidebarListComponent: SidebarListComponent;
    modalAddUsers: UsersModal;
    modalRemoveUsers: UsersModal;

    constructor() {
        super([
            new User(),
            new SidebarListComponent(),
            new ChatRoom(),
            new EditText([
                new UploadButton(),
                new InputMessage(),
                new Button('', 'input__send')
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
        let modals = <Modal[]>this.getChildComponentsByName('Modal');
        this.modalChatAdd = modals[0];
        this.modalConfirm = modals[1];
        this.sidebarListComponent = <SidebarListComponent>this.getChildComponentsByName('SidebarListComponent')[0];
        this.chatRoom = <ChatRoom>this.getChildComponentsByName('ChatRoom')[0];
        this.user = <User>this.getChildComponentsByName('User')[0];
        this.modalAddUsers = <UsersModal>this.getChildComponentsByName('UsersModal')[0];
        this.modalRemoveUsers = <UsersModal>this.getChildComponentsByName('UsersModal')[1];
        this.initModal();
        this.getChats();
    }

    onChatAction(payload: Payload = {}) {
        let action = <CHAT_ACTION>payload['action'];
        switch (action) {
            case 'chatRemove':
                if (this.sidebarListComponent.adapter.getItems().length) {
                    this.modalConfirm.onChangedCallback = () => {
                        let activeChat = <ChatData>this.sidebarListComponent.adapter.getItems().filter(item => item.isActive)[0];
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
                    this.modalAddUsers.onSubmitCallback = (usersData: UserData[]) => {
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
                            let usersData = JSON.parse(response.data) as UserData[];
                            this.modalRemoveUsers.notifyUserList(usersData);
                            this.modalRemoveUsers.onSubmitCallback = (usersData: UserData[]) => {
                                ChatsApi.deleteUsers(usersData.map(item => item.id), this.sidebarListComponent.currentItem.chatData.id)
                                    .then(response => {
                                        if (response.ok) {
                                            this.modalRemoveUsers.hide();
                                            let profileData = StateUtil.getUserProfile();
                                            if (!usersData || usersData.length! || usersData.some(data => profileData.id === data.id)) {
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
                let chatData = JSON.parse(response.data) as ChatData[];
                if (chatData.length) {
                    chatData[0].isActive = true;
                }
                this.sidebarListComponent.notify(new Adapter<ChatData>(chatData));
            }
        });
    }

    getTemplate(): string {
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

    getKeys(): Keys {
        return {};
    }

    initModal() {
        this.modalChatAdd.onChangedCallback = (files: FileList, chatTitle: string) => {
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
                    } else {
                        this.modalChatAdd.textInput.showMessage(JSON.parse(response.data)['reason']);
                    }
                });
        };
        this.user.btnAddChat.onclick = () => this.modalChatAdd.show();
    }
}
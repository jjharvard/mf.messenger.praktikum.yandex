import {ComponentGroup} from '../../content/ComponentGroup';
import {User} from './User';
import {ChatRoom} from './ChatRoom';
import {Adapter} from '../../content/Adapter';
import {EditText} from './EditText';
import {UploadButton} from './UploadButton';
import {InputMessage} from './InputMessage';
import {Modal, ModalBuilder} from '../_common/Modal';
import {ChatsApi} from '../../api/ChatsApi';
import {SidebarListComponent} from './lists/SidebarListComponent';
import {ChatData, MessageData, UserData} from '../../content/StorageTypes';
import {EventBus} from '../../utils/EventBus';
import {UsersModal} from './lists/users/UsersModal';
import {StateUtil} from '../../utils/StateUtil';
import {Button} from '../_common/Button';

export class ChatRootComponent extends ComponentGroup {
    modalChatAdd: Modal;
    modalConfirm: Modal;
    chatRoom: ChatRoom;
    user: User;
    sidebarListComponent: SidebarListComponent;
    modalAddUsers: UsersModal;
    modalRemoveUsers: UsersModal;
    editText: EditText;

    socket: WebSocket;

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
                .withInput('create-chat', 'create-chat', 'create-chat__input', 'Chat name', 'text')
                .withButton('Submit')
                .build(),
            new ModalBuilder()
                .withTitle('Are you sure?')
                .withButton('Delete')
                .build(),
            new UsersModal('Select User', 'User Login', 'Add'),
            new UsersModal('Remove Users', 'User Login', 'Remove')
        ]);
        EventBus.getInstance().register('onChatAction', this);
        EventBus.getInstance().register('onChatSelected', this);
        EventBus.getInstance().register('onChatRefresh', this);
    }

    onViewCreated() {
        const modals = <Modal[]>this.getChildComponentsByName('Modal');
        this.modalChatAdd = modals[0];
        this.modalConfirm = modals[1];
        this.sidebarListComponent = <SidebarListComponent>this.getChildComponentsByName('SidebarListComponent')[0];
        this.chatRoom = <ChatRoom>this.getChildComponentsByName('ChatRoom')[0];
        this.user = <User>this.getChildComponentsByName('User')[0];
        this.modalAddUsers = <UsersModal>this.getChildComponentsByName('UsersModal')[0];
        this.modalRemoveUsers = <UsersModal>this.getChildComponentsByName('UsersModal')[1];
        this.editText = <EditText>this.getChildComponentsByName('EditText')[0];
        this.initModal();
        this.getChats();
        this.initEditText();
    }

    initEditText() {
        this.editText.onBtnSendCallback = (message: string) => {
            const sendMessage = () => this.socket.send(JSON.stringify({
                content: message,
                type: 'message'
            }));
            if (this.socket.readyState === WebSocket.OPEN) {
                sendMessage();
            } else {
                this.openWebSocket(this.sidebarListComponent.currentItem.chatData, () => this.getHistory(0).then(messageData => {
                    this.chatRoom.notifyChatListAll(new Adapter<MessageData>(messageData));
                    sendMessage();
                }));
            }
        };
    }

    openWebSocket(chatData: ChatData, onOpened: () => void) {
        const userProfile = StateUtil.getUserProfile();
        ChatsApi.getToken(chatData.id)
            .then(response => {
                if (response.ok) {
                    const token = JSON.parse(response.data)['token'];
                    this.socket = new WebSocket('wss://ya-praktikum.tech/ws/chats/' + userProfile.id + '/' + chatData.id + '/' + token);
                    this.socket.addEventListener('open', onOpened);
                    this.socket.addEventListener('message', e => {
                        const event = JSON.parse(e.data);
                        if (!Array.isArray(event) && event['type'] === 'message') {
                            const messageData = {...event, user_id: event['userId']} as MessageData;
                            this.chatRoom.notifyChatList(messageData);
                        }
                    });
                    this.socket.addEventListener('error', event => {
                        console.log('Error => ', event);
                    });
                }
            });
    }

    getHistory = (from: number = 0) => new Promise<MessageData[]>((resolve) => {
        if (!this.socket) {
            resolve([]);
        } else {
            const listener = (event: MessageEvent) => {
                this.socket.removeEventListener('message', listener);
                if (Array.isArray(JSON.parse(event.data))) {
                    const messageData = JSON.parse(event.data) as MessageData[];
                    resolve(messageData);
                } else {
                    resolve([]);
                }
            };
            this.socket.addEventListener('message', listener);
            this.socket.send(JSON.stringify({
                content: from,
                type: 'get old'
            }));
        }
    });

    onChatRefresh() {
        const items = this.chatRoom.chatListComponent.adapter.getItems();
        this.getHistory(items.length).then(messageData => {
            if (messageData.length) {
                const all = [...items, ...messageData];
                const previousPos = this.chatRoom.chatListComponent.list.scrollTop;
                this.chatRoom.notifyChatListAll(new Adapter<MessageData>(all));
                this.chatRoom.chatListComponent.list.scrollTop = previousPos;
            }
        });
    }

    onChatSelected(payload: Payload = {}) {
        if (this.socket) {
            this.socket.close();
        }
        const chatData = payload['chatData'] as ChatData;
        this.openWebSocket(chatData, () => this.getHistory(0).then(messageData => {
            this.chatRoom.notifyChatListAll(new Adapter<MessageData>(messageData));
        }));
    }

    onChatAction(payload: Payload = {}) {
        const action = <CHAT_ACTION>payload['action'];
        switch (action) {
            case 'chatRemove':
                if (this.sidebarListComponent.adapter.getItems().length) {
                    this.modalConfirm.onChangedCallback = () => {
                        const activeChat = <ChatData>this.sidebarListComponent.adapter.getItems().filter(item => item.isActive)[0];
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
                            const usersData = JSON.parse(response.data) as UserData[];
                            this.modalRemoveUsers.notifyUserList(usersData);
                            this.modalRemoveUsers.onSubmitCallback = (usersData: UserData[]) => {
                                ChatsApi.deleteUsers(usersData.map(item => item.id), this.sidebarListComponent.currentItem.chatData.id)
                                    .then(response => {
                                        if (response.ok) {
                                            this.modalRemoveUsers.hide();
                                            const profileData = StateUtil.getUserProfile();
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
                const chatData = JSON.parse(response.data) as ChatData[];
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
                        const chatId = JSON.parse(response.data)['id'];
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

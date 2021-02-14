import {ComponentGroup} from "../../abstract/ComponentGroup.js";
import {User} from "./User.js";
import {ChatRoom} from "./ChatRoom.js";
import {Adapter} from "../../abstract/Adapter.js";
import {EditText} from "./EditText.js";
import {UploadButton} from "./UploadButton.js";
import {InputMessage} from "./InputMessage.js";
import {Button} from "./Button.js";
import {Modal, ModalBuilder} from "../_common/Modal.js";
import {ChatsApi} from "../../api/ChatsApi.js";
import {SidebarListComponent} from "./lists/SidebarListComponent.js";
import {ChatData} from "../../abstract/StorageTypes.js";
import {EventBus} from "../../utils/EventBus.js";

export class ChatRootComponent extends ComponentGroup {

    modalChatAdd: Modal;
    modalConfirm: Modal;
    chatRoom: ChatRoom;
    user: User;
    sidebarListComponent: SidebarListComponent;

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
                .build()
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
        this.sidebarListComponent = <SidebarListComponent>this.getChildComponentsByName('SidebarListComponent')[0];
        this.initModal();
        this.getChats();
    }

    onChatAction(_: Payload = {}) {
        this.modalConfirm.show();
    }

    getChats() {
        ChatsApi.getChats().then(response => {
            if (response.ok) {
                let chatData = JSON.parse(response.data) as ChatData[];
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
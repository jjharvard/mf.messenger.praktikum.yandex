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

export class ChatRootComponent extends ComponentGroup {

    modal: Modal;
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
                .withInput("create-chat", "create-chat__input", "Chat name", "text")
                .withButton('Submit')
                .build()
        ]);
    }

    onViewCreated() {
        this.modal = <Modal>(this.getChildComponentsByName('Modal')[0]);
        this.user = <User>this.getChildComponentsByName('User')[0];
        this.initModal();

        this.sidebarListComponent = <SidebarListComponent>this.getChildComponentsByName('SidebarListComponent')[0];

        this.getChats();
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
                </div>`;
    }

    getKeys(): Keys {
        return {};
    }

    initModal() {
        this.modal.onChangedCallback = (files: FileList, chatTitle: string) => {
            if (!files || files.length === 0) {
                this.modal.textInput.showMessage('Please, add avatar image');
                return;
            }
            ChatsApi.createChat(chatTitle)
                .then(response => {
                    if (response.ok) {
                        let chatId = JSON.parse(response.data)['id'];
                        ChatsApi.changeAvatar(chatId, files)
                            .then(_ => {
                                this.modal.hide();
                                this.getChats();
                            });
                    } else {
                        this.modal.textInput.showMessage(JSON.parse(response.data)['reason']);
                    }
                });
        };
        this.user.btnAddChat.onclick = () => this.modal.show();
    }
}
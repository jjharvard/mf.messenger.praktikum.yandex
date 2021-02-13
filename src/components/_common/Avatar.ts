import {Component} from "../../abstract/Component.js";
import {API_HOST} from "../../api/Client.js";

export class Avatar extends Component {

    constructor(private paragraphDisplay: string, private avatarUrl: string) {
        super();
    }

    getKeys(): Keys {
        return {
            'display': this.paragraphDisplay,
            'avatar': this.avatarUrl
        };
    }

    setAvatar(avatar: string) {
        let img = <HTMLImageElement>this.getDOMView()!.querySelector('.profile-title__icon');
        img.src = API_HOST + avatar;
    }

    setName(name: string) {
        let label = <HTMLLabelElement>this.getDOMView()!.querySelector('.profile-title__label');
        label.textContent = name;
    }

    onViewCreated(): boolean {
        if (super.onViewCreated()) {
            return true;
        } else {
            return false;
        }
    }

    getTemplate(): string {
        return `
                <div  class="profile-title">
                    <img class="profile-title__icon" src="{{avatar}}" alt=""/>
                    <p class="profile-title__hover-message" style="display: {{display}};">Upload<br>image</p>
                    <label class="profile-title__label"></label>
                </div>`;
    }

}
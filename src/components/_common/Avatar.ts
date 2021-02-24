import {Component} from '../../content/Component';
import {API_HOST} from '../../content/HTTPTransport';
import {Consts} from '../../utils/Consts';

export class Avatar extends Component {
    constructor(private paragraphDisplay: string, private avatarUrl: string) {
        super();
    }

    getKeys(): Keys {
        return {
            'display': this.paragraphDisplay,
            'avatar': this.avatarUrl ? this.avatarUrl : Consts.DEFAULT_AVATAR
        };
    }

    setAvatar(avatar: string) {
        const img = <HTMLImageElement> this.getDOMView()!.querySelector('.profile-title__icon');
        img.src = API_HOST + avatar;
    }

    setName(name: string) {
        const label = <HTMLLabelElement> this.getDOMView()!.querySelector('.profile-title__label');
        label.textContent = name;
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

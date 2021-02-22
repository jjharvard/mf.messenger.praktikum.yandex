import { Component } from "../../content/Component";
import { API_HOST } from "../../content/HTTPTransport";
export class Avatar extends Component {
    constructor(paragraphDisplay, avatarUrl) {
        super();
        this.paragraphDisplay = paragraphDisplay;
        this.avatarUrl = avatarUrl;
    }
    getKeys() {
        return {
            'display': this.paragraphDisplay,
            'avatar': this.avatarUrl
        };
    }
    setAvatar(avatar) {
        let img = this.getDOMView().querySelector('.profile-title__icon');
        img.src = API_HOST + avatar;
    }
    setName(name) {
        let label = this.getDOMView().querySelector('.profile-title__label');
        label.textContent = name;
    }
    getTemplate() {
        return `
                <div  class="profile-title">
                    <img class="profile-title__icon" src="{{avatar}}" alt=""/>
                    <p class="profile-title__hover-message" style="display: {{display}};">Upload<br>image</p>
                    <label class="profile-title__label"></label>
                </div>`;
    }
}
//# sourceMappingURL=Avatar.js.map
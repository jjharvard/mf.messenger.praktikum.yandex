import { Component } from "../../abstract/Component.js";
export class Avatar extends Component {
    constructor(paragraphDisplay) {
        super();
        this.paragraphDisplay = paragraphDisplay;
    }
    getKeys() {
        return {
            'display': this.paragraphDisplay
        };
    }
    getTemplate() {
        return `
                <div  class="profile-title">
                    <img class="profile-title__icon" src="img/owl.png" alt=""/>
                    <p class="profile-title__hover-message" style="display: {{display}};">Upload<br>image</p>
                    <label class="profile-title__label">John</label>
                </div>`;
    }
}
//# sourceMappingURL=Avatar.js.map
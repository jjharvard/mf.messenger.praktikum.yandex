import {Component} from "../../abstract/Component";

export class Avatar extends Component {

    constructor(private paragraphDisplay: string) {
        super();
    }

    getKeys(): Keys {
        return {
            'display': this.paragraphDisplay
        };
    }

    getTemplate(): string {
        return `
                <div  class="profile-title">
                    <img class="profile-title__icon" src="img/owl.png" alt=""/>
                    <p class="profile-title__hover-message" style="display: {{display}};">Upload<br>image</p>
                    <label class="profile-title__label">John</label>
                </div>`;
    }

}
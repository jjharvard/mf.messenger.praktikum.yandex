import {Page} from "../abstract/Page.js";
import {ProfileComponent} from "../components/profile/ProfileComponent.js";

let profilePage = new Page(new ProfileComponent());
profilePage.mount();
import { Page } from "../abstract/Page";
import { ProfilePage } from "../components/profile/ProfilePage";
let profilePage = new Page(new ProfilePage());
profilePage.mount();

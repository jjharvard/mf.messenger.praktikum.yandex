import { Mountable } from "../abstract/Mountable";
import { LoginPage } from "../components/login/LoginPage";
let MountableLoginPage = Mountable(LoginPage);
let chatPage = new MountableLoginPage();
chatPage.mount(chatPage);

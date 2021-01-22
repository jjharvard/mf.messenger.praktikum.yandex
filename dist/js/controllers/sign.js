import { Mountable } from "../abstract/Mountable";
import { SignPage } from "../components/sign/SignPage";
let MountableSignPage = Mountable(SignPage);
let signPage = new MountableSignPage();
signPage.mount(signPage);

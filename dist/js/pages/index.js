import { Router } from "../abstract/Router.js";
import { signPage } from "./sign.js";
import { chatPage } from "./chat.js";
import { loginPage } from "./login.js";
import { profilePage } from "./profile.js";
import { profileDataChange } from "./profile_data_change.js";
import { profilePasswordChange } from "./profile_password_change.js";
const router = Router.getInstance();
router.addRoutes([
    {
        path: "/#login",
        page: loginPage
    },
    {
        path: "/#sign",
        page: signPage
    },
    {
        path: "/#chat",
        page: chatPage
    },
    {
        path: "/#profile",
        page: profilePage
    },
    {
        path: "/#profile-change-data",
        page: profileDataChange
    },
    {
        path: "/#profile-change-password",
        page: profilePasswordChange
    }
]);
window.onload = () => {
    router.start();
};
//# sourceMappingURL=index.js.map
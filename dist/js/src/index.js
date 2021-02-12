import { Router } from "./abstract/Router.js";
import { signPage } from "./pages/sign.js";
import { chatPage } from "./pages/chat.js";
import { loginPage } from "./pages/login.js";
import { profilePage } from "./pages/profile.js";
import { profileDataChange } from "./pages/profile_data_change.js";
import { profilePasswordChange } from "./pages/profile_password_change.js";
import { AuthApi } from "./api/AuthApi.js";
const router = Router.getInstance();
router.addRoutes([
    {
        path: "/login",
        page: loginPage
    },
    {
        path: "/sign",
        page: signPage
    },
    {
        path: "/chat",
        page: chatPage
    },
    {
        path: "/profile",
        page: profilePage
    },
    {
        path: "/profile-change-data",
        page: profileDataChange
    },
    {
        path: "/profile-change-password",
        page: profilePasswordChange
    }
]);
window.onload = () => {
    AuthApi.logOut().then(_ => {
        router.start("/login");
    });
};
//# sourceMappingURL=index.js.map
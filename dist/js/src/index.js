import { Router } from "./content/Router.js";
import { Page } from "./content/Page.js";
import { ChatRootComponent } from "./components/chat/ChatRootComponent.js";
import { ErrorComponent } from "./components/error/ErrorComponent.js";
import { LoginComponent } from "./components/login/LoginComponent.js";
import { ProfileComponent } from "./components/profile/ProfileComponent.js";
import { SignComponent } from "./components/sign/SignComponent.js";
import { ProfilePassChangeComponent } from "./components/profilepassword/ProfilePassChangeComponent.js";
import { ProfileDataChangeComponent } from "./components/profiledata/ProfileDataChangeComponent.js";
export const signPage = new Page(new SignComponent());
export const loginPage = new Page(new LoginComponent());
export const chatPage = new Page(new ChatRootComponent());
export const profilePage = new Page(new ProfileComponent());
export const profilePasswordChange = new Page(new ProfilePassChangeComponent());
export const profileDataChange = new Page(new ProfileDataChangeComponent());
export const errorPage404 = new Page(new ErrorComponent('404', 'Request Error'));
export const errorPage500 = new Page(new ErrorComponent('500', 'Server Error'));
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
    },
    {
        path: "/error-404",
        page: errorPage404
    },
    {
        path: "/error-500",
        page: errorPage500
    }
]);
window.onload = () => {
    router.start("/login");
};
//# sourceMappingURL=index.js.map
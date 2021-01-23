import {Page} from "../abstract/Page";
import {LoginPage} from "../components/login/LoginPage";


let loginPage = new Page(new LoginPage())
loginPage.mount()
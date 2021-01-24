import {Page} from "../abstract/Page";
import {LoginComponent} from "../components/login/LoginComponent";


let loginPage = new Page(new LoginComponent())
loginPage.mount()
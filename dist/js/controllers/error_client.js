import { Page } from "../abstract/Page";
import { ErrorComponent } from "../components/error/ErrorComponent";
let errorPage = new Page(new ErrorComponent('404', 'Request Error'));
errorPage.mount();

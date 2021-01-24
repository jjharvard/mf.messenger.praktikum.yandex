import {Page} from "../abstract/Page";
import {ErrorComponent} from "../components/error/ErrorComponent";

let errorPage = new Page(new ErrorComponent('500', 'Server Error'))
errorPage.mount()
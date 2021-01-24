import {Page} from "../abstract/Page";
import {ErrorPage} from "../components/error/ErrorPage";

let errorPage = new Page(new ErrorPage('500', 'Server Error'))
errorPage.mount()
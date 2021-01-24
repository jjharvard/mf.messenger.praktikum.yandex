import { Page } from "../abstract/Page";
import { ErrorPage } from "../components/error/ErrorPage";
let errorPage = new Page(new ErrorPage('404', 'Request Error'));
errorPage.mount();

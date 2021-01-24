import { Page } from "../abstract/Page.js";
import { ErrorComponent } from "../components/error/ErrorComponent.js";
let errorPage = new Page(new ErrorComponent('500', 'Server Error'));
errorPage.mount();
//# sourceMappingURL=error_server.js.map
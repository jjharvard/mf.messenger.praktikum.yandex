import {expect} from "chai";
import {Templator} from "../src/utils/Templator";

describe("Templator", () => {
    it("should parse keys", () => {
        let uuid = Templator.uuidv4();
        let result = `<div id="${uuid}">value</div>`;
        let template = `<div>{{key}}</div>`;
        let keys = {uuid: [uuid], key: ["value"]};
        let res = Templator.getInstance().withTemplate(template).compile(keys);
        expect(res).equal(result);
    });
});

import { expect } from "chai";
import { Templator } from "../Templator";
describe("Templator", () => {
    it("should be created once", () => {
        let res1 = Templator.getInstance();
        let res2 = Templator.getInstance();
        expect(res1 === res2).equal(true);
    });
    it("should parse keys", () => {
        let uuid = Templator.uuidv4();
        let result = `<div id="${uuid}">value</div>`;
        let template = `<div>{{key}}</div>`;
        let keys = { uuid: [uuid], key: ["value"] };
        let res = Templator.getInstance().withTemplate(template).compile(keys);
        expect(res).equal(result);
    });
    it("should not parse keys", () => {
        let uuid = Templator.uuidv4();
        let template = `<div>{{key}}</div>`;
        let keys = { uuid2: [uuid], key: ["value"] };
        let res = Templator.getInstance().withTemplate(template).compile(keys);
        expect(res.includes("undefined")).equal(true);
    });
    it("should replace string at index", () => {
        let templator = Templator.getInstance();
        let result = templator.replaceAt('abc', 1, 1, 'v');
        expect(result).equal('avc');
        let result2 = templator.replaceAt('abc', -1, 0, 'v');
        expect(result2).equal('vc');
    });
    it("should replace string at negative index", () => {
        let templator = Templator.getInstance();
        let result = templator.replaceAt('abc', -1, 0, 'v');
        expect(result).equal('vc');
    });
    it("should append with excessive index", () => {
        let templator = Templator.getInstance();
        let result = templator.replaceAt('abc', 4, 1, 'v');
        expect(result).equal('abcv');
    });
    it("should generate 8 digit uuid", () => {
        let uuid1 = Templator.uuidv4();
        let uuid2 = Templator.uuidv4();
        let uuid3 = Templator.uuidv4();
        expect(uuid1).not.equal(uuid2).not.equal(uuid3);
    });
});
//# sourceMappingURL=Templator.spec.js.map
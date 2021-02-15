import {expect} from "chai";
import {Router} from "../Router.js";

describe("Router", () => {

    it("should be created once", () => {
        let res1 = Router.getInstance();
        let res2 = Router.getInstance();
        expect(res1 === res2).equal(true);
    });

});


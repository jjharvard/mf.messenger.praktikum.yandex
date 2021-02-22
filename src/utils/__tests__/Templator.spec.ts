import {expect} from 'chai';
import {Templator} from '../Templator';

describe('Templator', () => {
    it('should be created once', () => {
        const res1 = Templator.getInstance();
        const res2 = Templator.getInstance();
        expect(res1 === res2).equal(true);
    });

    it('should parse keys', () => {
        const uuid = Templator.uuidv4();
        const result = `<div id="${uuid}">value</div>`;
        const template = `<div>{{key}}</div>`;
        const keys = {uuid: [uuid], key: ['value']};
        const res = Templator.getInstance().withTemplate(template).compile(keys);
        expect(res).equal(result);
    });

    it('should not parse keys', () => {
        const uuid = Templator.uuidv4();
        const template = `<div>{{key}}</div>`;
        const keys = {uuid2: [uuid], key: ['value']};
        const res = Templator.getInstance().withTemplate(template).compile(keys);
        expect(res.includes('undefined')).equal(true);
    });

    it('should replace string at index', () => {
        const templator = Templator.getInstance();
        const result = templator.replaceAt('abc', 1, 1, 'v');
        expect(result).equal('avc');
        const result2 = templator.replaceAt('abc', -1, 0, 'v');
        expect(result2).equal('vc');
    });

    it('should replace string at negative index', () => {
        const templator = Templator.getInstance();
        const result = templator.replaceAt('abc', -1, 0, 'v');
        expect(result).equal('vc');
    });

    it('should append with excessive index', () => {
        const templator = Templator.getInstance();
        const result = templator.replaceAt('abc', 4, 1, 'v');
        expect(result).equal('abcv');
    });

    it('should generate 8 digit uuid', () => {
        const uuid1 = Templator.uuidv4();
        const uuid2 = Templator.uuidv4();
        const uuid3 = Templator.uuidv4();
        expect(uuid1).not.equal(uuid2).not.equal(uuid3);
    });
});

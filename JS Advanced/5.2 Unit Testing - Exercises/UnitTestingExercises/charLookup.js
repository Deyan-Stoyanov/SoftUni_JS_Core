function lookupChar(string, index) {
    if (typeof(string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
}

let expect = require("chai").expect;

describe("Lookup Char", function () {
    it("when first parameter is not a string, should return undefined", function () {
        expect(lookupChar(1, 1)).to.be.equal(undefined);
        expect(lookupChar(null, 1)).to.be.equal(undefined);
        expect(lookupChar(undefined, 1)).to.be.equal(undefined);
        expect(lookupChar(true, 1)).to.be.equal(undefined);
        expect(lookupChar(1.4, 1)).to.be.equal(undefined);
        expect(lookupChar(NaN, 1)).to.be.equal(undefined);
        expect(lookupChar(["a"], 1)).to.be.equal(undefined);
        expect(lookupChar({}, 1)).to.be.equal(undefined);
        expect(lookupChar(function(){return "a";}, 1)).to.be.equal(undefined);
    });
    it("when second parameter is not an integer, should return undefined", function () {
        expect(lookupChar("a", 1.5)).to.be.equal(undefined);
        expect(lookupChar("a", "1")).to.be.equal(undefined);
        expect(lookupChar("a", null)).to.be.equal(undefined);
        expect(lookupChar("a", NaN)).to.be.equal(undefined);
        expect(lookupChar("a", [1])).to.be.equal(undefined);
        expect(lookupChar("a", {})).to.be.equal(undefined);
    });
    it("when index invalid, should return Incorrect index", function () {
        expect(lookupChar("a", 1)).to.be.equal("Incorrect index");
        expect(lookupChar("", 0)).to.be.equal("Incorrect index");
        expect(lookupChar("a", -1)).to.be.equal("Incorrect index");
        expect(lookupChar("aa", 25)).to.be.equal("Incorrect index");
        expect(lookupChar("asd", "asd".length)).to.be.equal("Incorrect index");
    });
    it("when all parameters valid, should return char at passed index", function () {
        expect(lookupChar("a", 0)).to.be.equal("a");
        expect(lookupChar("asdasdasdasdasd", 0)).to.be.equal("a");
        expect(lookupChar(" ", 0)).to.be.equal(" ");
        expect(lookupChar("aasdasdasdasd", 3)).to.be.equal("d");
        expect(lookupChar("aasdasdasdasd", "aasdasdasdasd".length - 1)).to.be.equal("d");
    });
});

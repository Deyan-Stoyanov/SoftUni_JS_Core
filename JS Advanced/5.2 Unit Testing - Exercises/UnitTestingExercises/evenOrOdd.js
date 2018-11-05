function isOddOrEven(string) {
    if (typeof(string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return "even";
    }

    return "odd";
}

let expect = require("chai").expect;

describe("Even or Odd", function(){
    it("when a non-string is passed, should return undefined", function(){
        expect(isOddOrEven(1)).to.be.equal(undefined);
        expect(isOddOrEven(null)).to.be.equal(undefined);
        expect(isOddOrEven(true)).to.be.equal(undefined);
        expect(isOddOrEven(["a"])).to.be.equal(undefined);
        expect(isOddOrEven({a: "a"})).to.be.equal(undefined);
        expect(isOddOrEven(undefined)).to.be.equal(undefined);
        expect(isOddOrEven(NaN)).to.be.equal(undefined);
        expect(isOddOrEven(function(){return "a";})).to.be.equal(undefined);
    });
    it("when a string with even length is passed, should return even", function(){
        expect(isOddOrEven("")).to.be.equal("even");
        expect(isOddOrEven("aa")).to.be.equal("even");
        expect(isOddOrEven("  ")).to.be.equal("even");
        expect(isOddOrEven("        ")).to.be.equal("even");
        expect(isOddOrEven("\"\"")).to.be.equal("even");
        expect(isOddOrEven("11")).to.be.equal("even");
        expect(isOddOrEven("\\\\")).to.be.equal("even");
    });
    it("when a string with odd length is passed, should return odd", function(){
        expect(isOddOrEven("1")).to.be.equal("odd");
        expect(isOddOrEven("aaa")).to.be.equal("odd");
        expect(isOddOrEven(" ")).to.be.equal("odd");
        expect(isOddOrEven("\"")).to.be.equal("odd");
    });
});

function isSymmetric(arr) {
    if (!Array.isArray(arr))
        return false; // Non-arrays are non-symmetric
    let reversed = arr.slice(0).reverse(); // Clone and reverse
    let equal = (JSON.stringify(arr) == JSON.stringify(reversed));
    return equal;
}

let expect = require("chai").expect;
let assert = require("chai").assert;

describe("isSymetric()", function() {

    it("with input other than array, should return false", function(){
        expect(isSymmetric(1)).to.be.equal(false);
        expect(isSymmetric("a")).to.be.equal(false);
        expect(isSymmetric(function (a) { return a; })).to.be.equal(false);
        expect(isSymmetric({a: 1})).to.be.equal(false);
        expect(isSymmetric(null)).to.be.equal(false);
        expect(isSymmetric(undefined)).to.be.equal(false);
        expect(isSymmetric(true)).to.be.equal(false);
    });

    it("with symetrical array should return true", function() {
        expect(isSymmetric([1, 2, 1])).to.be.equal(true);
        expect(isSymmetric([1, 2, 2, 1])).to.be.equal(true);
        expect(isSymmetric([1.1, 2, 2, 1.1])).to.be.equal(true);
        expect(isSymmetric([1, 1])).to.be.equal(true);
        expect(isSymmetric([1])).to.be.equal(true);
        expect(isSymmetric([])).to.be.equal(true);
        expect(isSymmetric([1, 2, 3, 2, 1])).to.be.equal(true);
        expect(isSymmetric(["str", 2, 3, 2, "str"])).to.be.equal(true);
        expect(isSymmetric(["str", 2, true, 2, "str"])).to.be.equal(true);
        expect(isSymmetric(["str", [2], true, [2], "str"])).to.be.equal(true);
        expect(isSymmetric(["str", [2], {}, [2], "str"])).to.be.equal(true);
        expect(isSymmetric(["str", {a: 1}, {}, {a: 1}, "str"])).to.be.equal(true);
        expect(isSymmetric([null, {a: 1}, {}, {a: 1}, null])).to.be.equal(true);
        expect(isSymmetric([null, undefined, {}, undefined, null])).to.be.equal(true);
        expect(isSymmetric([function(){let a = 1; return a;}, 2, 2, function(){let b = 2; return ++b;}])).to.be.equal(true);
    });

    it("with asymetrical arrays should return false", function(){
        expect(isSymmetric([1, 2])).to.be.equal(false);
        expect(isSymmetric([1, 2, 3])).to.be.equal(false);
        expect(isSymmetric([1, 2, 1, 2])).to.be.equal(false);
        expect(isSymmetric([1, 2, 2, 1.1])).to.be.equal(false);
        expect(isSymmetric([true, 2, 2, false])).to.be.equal(false);
        expect(isSymmetric([{a: 2}, 2, 2, {b: 1}])).to.be.equal(false);
    });
});

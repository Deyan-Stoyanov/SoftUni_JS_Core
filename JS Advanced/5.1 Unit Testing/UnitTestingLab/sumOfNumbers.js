function sum(arr) {
    let sum = 0;
    for (let num of arr) {
        sum += Number(num);
    }
    return sum;
}

let expect = require("chai").expect;
let assert = require("chai").assert;

describe("sum(arr)", function(){
    it("with ar array of numbers, should return their sum", function(){
        expect(sum([1, 2, 3])).to.be.equal(6, "Function did not sum properly.");
        expect(sum([1, -1, 3])).to.be.equal(3, "Function did not sum properly.");
        expect(sum([1, 0, 3])).to.be.equal(4, "Function did not sum properly.");
        expect(sum([1, 2.5, 3])).to.be.equal(6.5, "Function did not sum properly.");
    });
    it("with a single number, should return the number", function(){
        expect(sum([1])).to.be.equal(1, "Function did not return only number.");
    });
    it("with an empty array, should return 0", function(){
        expect(sum([])).to.be.equal(0, "Function did not return 0 when an empty array passed.");
    });
    it("with an array containing strings, should return NaN", function(){
        assert.isNaN(sum([2, "a", 1]), "Function did not return NaN.");
    });
});

let mathEnforcer = {
    addFive: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof(num1) !== 'number' || typeof(num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};

let expect = require("chai").expect;
let assert = require("chai").assert;
describe("Math Enforcer", function(){
    describe("Add Five", function () {
        it("when non-number passed, should return undefined", function(){
            expect(mathEnforcer.addFive("4")).to.be.undefined;
            expect(mathEnforcer.addFive([4])).to.be.undefined;
            expect(mathEnforcer.addFive({})).to.be.undefined;
            expect(mathEnforcer.addFive(null)).to.be.undefined;
            expect(mathEnforcer.addFive(undefined)).to.be.undefined;
        });
        it("when correct parameter passed, should return the parameter, incremented by five", function(){
            expect(typeof mathEnforcer.addFive(1)).to.be.equal("number");
            expect(mathEnforcer.addFive(1)).to.be.equal(6);
            expect(mathEnforcer.addFive(0)).to.be.equal(5);
            expect(mathEnforcer.addFive(-2)).to.be.equal(3);
            assert.isNaN(mathEnforcer.addFive(NaN));
            expect(mathEnforcer.addFive(1.5)).to.be.equal(6.5);
            expect(mathEnforcer.addFive(Math.PI)).to.be.equal(Math.PI + 5);
            expect(mathEnforcer.addFive(100000000000)).to.be.equal(100000000005);
            expect(mathEnforcer.addFive(-100000000000)).to.be.equal(-99999999995);
        });
    });
    describe("Subtract Ten", function () {
        it("when non-number passed, should return undefined", function(){
            expect(mathEnforcer.subtractTen("1")).to.be.undefined;
            expect(mathEnforcer.subtractTen([1])).to.be.undefined;
            expect(mathEnforcer.subtractTen(true)).to.be.undefined;
            expect(mathEnforcer.subtractTen(undefined)).to.be.undefined;
            expect(mathEnforcer.subtractTen(null)).to.be.undefined;
        });
        it("when correct parameter passed, should return the parameter, decremented by ten", function(){
            expect(typeof mathEnforcer.subtractTen(10)).to.be.equal("number");
            expect(mathEnforcer.subtractTen(10)).to.be.equal(0);
            assert.isNaN(mathEnforcer.subtractTen(NaN));
            expect(mathEnforcer.subtractTen(0)).to.be.equal(-10);
            expect(mathEnforcer.subtractTen(1000)).to.be.equal(990);
            expect(mathEnforcer.subtractTen(-1000)).to.be.equal(-1010);
            expect(mathEnforcer.subtractTen(Math.PI)).to.be.equal(Math.PI - 10);
        });
    });
    describe("Sum", function () {
        it("when non-number as first parameter passed, should return undefined", function(){
            expect(mathEnforcer.sum("1", 2)).to.be.undefined;
            expect(mathEnforcer.sum([1], 2)).to.be.undefined;
            expect(mathEnforcer.sum(null, 2)).to.be.undefined;
            expect(mathEnforcer.sum(undefined, 2)).to.be.undefined;
        });
        it("when non-number as second parameter passed, should return undefined", function(){
            expect(mathEnforcer.sum(1, "1")).to.be.undefined;
            expect(mathEnforcer.sum(1, [1])).to.be.undefined;
            expect(mathEnforcer.sum(1, null)).to.be.undefined;
            expect(mathEnforcer.sum(1, undefined)).to.be.undefined;
        });
        it("when correct parameters passed, should return their sum", function(){
            expect(mathEnforcer.sum(1, 2)).to.be.equal(3);
            expect(mathEnforcer.sum(1, -1)).to.be.equal(0);
            expect(mathEnforcer.sum(0, 0)).to.be.equal(0);
            expect(mathEnforcer.sum(1.25, 2)).to.be.equal(3.25);
            expect(mathEnforcer.sum(-2.5, 2)).to.be.equal(-0.5);
            expect(mathEnforcer.sum(3.5, -0.5)).to.be.equal(3);
            expect(mathEnforcer.sum(3.5, Math.PI)).to.be.equal(3.5 + Math.PI);
            assert.isNaN(mathEnforcer.sum(NaN, 1));
            assert.isNaN(mathEnforcer.sum(NaN, NaN));
            assert.isNaN(mathEnforcer.sum(1, NaN));
        });
    });
});

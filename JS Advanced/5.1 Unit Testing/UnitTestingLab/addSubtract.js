function createCalculator() {
    let value = 0;
    return {
        add: function(num) { value += Number(num); },
        subtract: function(num) { value -= Number(num); },
        get: function() { return value; }
    };
}

let expect = require("chai").expect;
let assert = require("chai").assert;

describe("createCalculator()", function(){
    let calc;
    beforeEach(function(){
        calc = createCalculator();
    });

    it("should return the total sum after each addition", function () {
        calc.add(2);
        calc.add(3);
        expect(calc.get()).to.be.equal(5);
        calc.add(10);
        expect(calc.get()).to.be.equal(15);
    });

    it("should return a negative number after multiple subtractions", function () {
        calc.subtract(2);
        calc.subtract(3);
        expect(calc.get()).to.be.equal(-5);
        calc.subtract(10);
        expect(calc.get()).to.be.equal(-15);
    });

    it("should return a total number after multiple additions and subtractions", function () {
        calc.add(2);
        calc.subtract(3);
        expect(calc.get()).to.be.equal(-1);
        calc.add(10);
        calc.subtract(1);
        expect(calc.get()).to.be.equal(8);
    });

    it("should return 0 after equal additions and subtractions", function () {
        calc.add(2);
        calc.subtract(2);
        expect(calc.get()).to.be.equal(0);
    });

    it("should return a decimal numer after decimal additions and subtractions", function () {
        calc.add(2.5);
        calc.subtract(1.5);
        expect(calc.get()).to.be.equal(1);
    });

    it("should return correct sum after two valid strings passed", function () {
        calc.add("2");
        calc.subtract("3");
        expect(calc.get()).to.be.equal(-1);
    });

    it("should always return number", function () {
        calc.add(2);
        calc.subtract(2);
        expect(typeof calc.get()).to.be.equal("number");
        calc.add("2");
        calc.subtract("3");
        expect(typeof calc.get()).to.be.equal("number");
    });

    it("should return NaN after wrong parameters are passed", function () {
        calc.add(true);
        calc.subtract("a");
        assert.isNaN(calc.get());
        calc.add({1: 1});
        calc.subtract([1, 2]);
        assert.isNaN(calc.get());
    });
});

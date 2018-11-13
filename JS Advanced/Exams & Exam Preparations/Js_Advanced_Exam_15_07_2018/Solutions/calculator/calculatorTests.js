let Calculator = require("./calculator");
let expect = require("chai").expect;

describe("Calculator tests", () => {
    let calculator;
    beforeEach(() => {
        calculator = new Calculator();
    });
    it("when initialized, should be instanse of the Calculator class", () => {
        expect(calculator).to.be.instanceOf(Calculator);
        expect(calculator.expenses).to.be.instanceOf(Array);
        expect(calculator.expenses.length).to.be.equal(0);
    });
    it("when the method add is called, the parameter should be added to the expenses", () => {
        calculator.add("a");
        calculator.add(2);
        expect(calculator.expenses.length).to.be.equal(2);
        expect(calculator.expenses[0]).to.be.equal("a");
        expect(calculator.expenses[1]).to.be.equal(2);
    });
    it("when no numbers present, an error should be thrown by the divide method", () => {
        calculator.add("a");
        calculator.add("b");
        expect(() => calculator.divideNums()).to.throw(Error, "There are no numbers in the array!");
    });
    it("when dividing by zero, a message should be returned by the divide method", () => {
        calculator.add(2);
        calculator.add("a");
        calculator.add(0);
        let result = calculator.divideNums();
        expect(result).to.equal("Cannot divide by zero");
    });
    it("when only one number present, the divide method should return the number", () => {
        calculator.add(2);
        calculator.add("a");
        calculator.add("3");
        expect(calculator.divideNums()).to.be.equal(2);
    });
    it("when only one number present, the divide method should return the number", () => {
        calculator.add(20);
        calculator.add(5);
        calculator.add("a");
        calculator.add(2);
        calculator.add("b");
        calculator.add(2);
        let result = calculator.divideNums();
        expect(result).to.be.equal(1);
    });
    it("when no elements in the expenses, toString should return message", () => {
        expect(calculator.toString()).to.be.equal("empty array");
    });
    it("when elements in the expenses, should return the joined elements", () => {
        calculator.add(5);
        calculator.add("a");
        calculator.add(2);
        expect(calculator.toString()).to.be.equal("5 -> a -> 2");
    });
    it("when no elements in the expenses, orderBy should return message", () => {
        expect(calculator.orderBy()).to.be.equal("empty");
    });

    it("when all numbers in the expenses, orderBy should return the sorted numbers", () => {
        calculator.add(5);
        calculator.add(-2);
        calculator.add(10);
        calculator.add(1);
        expect(calculator.orderBy()).to.be.equal("-2, 1, 5, 10");
    });

    it("when mixed elements in the expenses, orderBy should return the sorted elements", () => {
        calculator.add(-5);
        calculator.add(5);
        calculator.add("a");
        calculator.add(10);
        calculator.add("f");
        expect(calculator.orderBy()).to.be.equal("-5, 10, 5, a, f");
    });
});

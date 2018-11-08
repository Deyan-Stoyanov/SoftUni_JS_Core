class Console {

    static get placeholder() {
        return /{\d+}/g;
    }

    static writeLine() {
        let message = arguments[0];
        if (arguments.length === 1) {
            if (typeof (message) === "object") {
                message = JSON.stringify(message);
                return message;
            } else if (typeof (message) === "string") {
                return message;
            }
        } else {
            if (typeof (message) !== "string") {
                throw new TypeError("No string format given!");
            } else {
                let tokens = message.match(this.placeholder).sort(function (a, b) {
                    a = Number(a.substring(1, a.length - 1));
                    b = Number(b.substring(1, b.length - 1));
                    return a - b;
                });
                if (tokens.length !== (arguments.length - 1)) {
                    throw new RangeError("Incorrect amount of parameters given!");
                } else {
                    for (let i = 0; i < tokens.length; i++) {
                        let number = Number(tokens[i].substring(1, tokens[i].length - 1));
                        if (number !== i) {
                            throw new RangeError("Incorrect placeholders given!");
                        } else {
                            message = message.replace(tokens[i], arguments[i + 1]);
                        }
                    }
                    return message;
                }
            }
        }
    }
}

let expect = require("chai").expect;

describe("Console class tests", () => {
    describe("WriteLine with a string parameter tests", () => {
        it("with a string parameter, should return the same string", () => {
            expect(Console.writeLine("str")).to.be.equal("str");
        });
        it("with a number parameter, should not return the number", () => {
            expect(Console.writeLine(1)).to.not.be.equal(1);
        });
        it("with a number parameter, should not return the stringified number", () => {
            expect(Console.writeLine(123)).to.not.be.equal("123");
        });
        it("with undefined parameter, should not return stringified undefined", () => {
            expect(Console.writeLine(undefined)).to.not.be.equal("undefined");
        });
    });
    describe("WriteLine with an object parameter tests", () => {
        it("with an object parameter, should return the stringified object", () => {
            expect(Console.writeLine({
                name: "Pesho"
            })).to.be.equal("{\"name\":\"Pesho\"}");
        });
        it("with an object parameter, should return the stringified object", () => {
            let obj = {
                name: "Pesho",
                age: 25,
                height: 1.82,
                address: {
                    town: "Plovdiv",
                    postCode: 4000,
                    emptyObj: {}
                },
                null: null,
                undefined: undefined,
            };
            expect(Console.writeLine(obj)).to.be.equal(JSON.stringify(obj));
        });
        it("with an empty object parameter, should return the empty stringified object", () => {
            expect(Console.writeLine({})).to.be.equal("{}");
        });
        it("with null parameter, should return null to string", () => {
            expect(Console.writeLine(null)).to.be.equal("null");
        });
    });
    describe("WriteLine template tests", () => {
        it("if fisrt parameter is not a string, should throw a TypeError", () => {
            expect(() => Console.writeLine(5, 5)).to.throw(TypeError, "No string format given!");
            expect(() => Console.writeLine({a: "asd"}, 5)).to.throw(TypeError, "No string format given!");
            expect(() => Console.writeLine(1, "a", "b", "c")).to.throw(TypeError, "No string format given!");
        });
        it("if parameters are not equal to the number of placeholders, should throw RangeError", () => {
            expect(() => Console.writeLine("The sum of {0} and {1} is {2}", 1)).to.throw(RangeError, "Incorrect amount of parameters given!");
            expect(() => Console.writeLine("The sum of {0} and {1} is {2}", 1, 2, 3, 4)).to.throw(RangeError, "Incorrect amount of parameters given!");
            expect(() => Console.writeLine("The sum of {0} and {1} is {2}", 1, 2)).to.throw(RangeError, "Incorrect amount of parameters given!");
        });
        it("if the placeholders have indexes not withing the parameters range, should throw RangeError", () => {
            expect(() => Console.writeLine("The sum of {0} and {1} is {3}{4}{13}", 1, 2, 3, 4, 5)).to.throw(RangeError, "Incorrect placeholders given!");
            expect(() => Console.writeLine("The sum of {-1} and {1} is {2}", 2, 3)).to.throw(RangeError, "Incorrect placeholders given!");
            expect(() => Console.writeLine("The sum of {1} and {2} is {3}", 1, 2, 3)).to.throw(RangeError, "Incorrect placeholders given!");
        });
        it("if multiple arguments are passed and the first is a string, find all placeholders from the string and exchange them with the supplied parameters", () => {
            expect(Console.writeLine("The sum of {0} and {1} is {2}", 1, 2, 3)).to.be.equal("The sum of 1 and 2 is 3");
            expect(Console.writeLine("The sum of {0} and {1} is {2}", "a", "b", "ab")).to.be.equal("The sum of a and b is ab");
        });
    });
});

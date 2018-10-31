function rgbToHexColor(red, green, blue) {
    if (!Number.isInteger(red) || (red < 0) || (red > 255))
        return undefined; // Red value is invalid
    if (!Number.isInteger(green) || (green < 0) || (green > 255))
        return undefined; // Green value is invalid
    if (!Number.isInteger(blue) || (blue < 0) || (blue > 255))
        return undefined; // Blue value is invalid
    return "#" +
        ("0" + red.toString(16).toUpperCase()).slice(-2) +
        ("0" + green.toString(16).toUpperCase()).slice(-2) +
        ("0" + blue.toString(16).toUpperCase()).slice(-2);
}
let expect = require("chai").expect;
let assert = require("chai").assert;

describe("rgbToHexColor()", function () {
    describe("Nominal cases (valid input)", function() {
        it("when smaller number passed, should return undefined", function () {
            expect(rgbToHexColor(-1, 0, 0));
            expect(rgbToHexColor(0, -255, 0));
            expect(rgbToHexColor(0, 0, -100000000000000));
        });

        it("when correct parameter passed, should return a correct formatted string", function () {
            for (let i = 0; i < 255; i++) {
                expect(rgbToHexColor(i, i, i)).to.match(/#[0-9A-F]{6}/g);
            }
            expect(rgbToHexColor(255, 255, 255)).to.match(/#[0-9A-F]{6}/g);
            expect(rgbToHexColor(153, 24, 201)).to.match(/#[0-9A-F]{6}/g);
        });

        it("when passed correct parameters, sjould return a correct result", function () {
            expect(rgbToHexColor(0, 0, 0)).to.be.equal("#000000");
            expect(rgbToHexColor(255, 255, 255)).to.be.equal("#FFFFFF");
            expect(rgbToHexColor(74, 66, 163)).to.be.equal("#4A42A3");
            expect(rgbToHexColor(158, 162, 65)).to.be.equal("#9EA241");
        });
    });

    describe("Special cases (invalid input)", function() {
        it("when non-integer passed, should return undefined", function () {
            expect(rgbToHexColor(25.5, 0, 0)).to.be.equal(undefined);
            expect(rgbToHexColor(true, 0, 0)).to.be.equal(undefined);
            expect(rgbToHexColor(0, "a", 0)).to.be.equal(undefined);
            expect(rgbToHexColor(155, 0, [0])).to.be.equal(undefined);
        });

        it("when incorrect number of parameters passed, should return undefined", function () {
            expect(rgbToHexColor(0, 0)).to.be.equal(undefined);
            expect(rgbToHexColor(155, 0, 0, 5)).to.not.be.equal(undefined);
            expect(rgbToHexColor()).to.be.equal(undefined);
        });

        it("when larger number passed, should return undefined", function () {
            expect(rgbToHexColor(256, 0, 0)).to.be.equal(undefined);
            expect(rgbToHexColor(0, 355, 0)).to.be.equal(undefined);
            expect(rgbToHexColor(0, 0, 10000000000000000)).to.be.equal(undefined);
        });

    });
});

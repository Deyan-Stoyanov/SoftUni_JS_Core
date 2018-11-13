const expect = require("chai").expect;
const HolidayPackage = require("./holidayPackage");

describe("HolidayPackage class tests", function () {
    let holidayPackage;
    beforeEach(() => {
        holidayPackage = new HolidayPackage("Sofia", "Summer");
    });
    describe("Constructor tests", function () {
        it("when a new object constructed, should be an instance of HolidayPackage", () => {
            expect(holidayPackage).to.be.instanceof(HolidayPackage);
            holidayPackage = new HolidayPackage("Beograd", "Winter");
            expect(holidayPackage).to.be.instanceof(HolidayPackage);
        });
    });
    describe("showVacationers tests", function () {
        it("when no vacationers present, should return message", () => {
            expect(holidayPackage.showVacationers()).to.be.equal("No vacationers are added yet");
        });
        it("when valid vacationers added, should return their names", () => {
            let newHolidayPackage = new HolidayPackage("Sofia", "Bulgaria");
            holidayPackage.addVacationer("Pesho Petrov");
            holidayPackage.addVacationer("Pesho Petrov");
            expect(holidayPackage.showVacationers()).to.be.equal("Vacationers:\nPesho Petrov\nPesho Petrov");
        });
    });
    describe("addVacationer tests", function () {
        it("should throw error if non-string passed", () => {
            expect(() => holidayPackage.addVacationer(12)).to.throw(Error, "Vacationer name must be a non-empty string");
        });
        it("should throw error if an empty string passed", () => {
            expect(() => holidayPackage.addVacationer("")).to.throw(Error, "Name must consist of first name and last name");
        });
        it("should throw error if an invalid string passed", () => {
            expect(() => holidayPackage.addVacationer("Pesho")).to.throw(Error, "Name must consist of first name and last name");
        });
        it("should insert vacationer if name valid", () => {
            holidayPackage.addVacationer("Pesho Petrov");
            expect(holidayPackage.vacationers.length).to.be.equal(1);
            expect(holidayPackage.showVacationers()).to.be.equal("Vacationers:\nPesho Petrov");
        });
    });
    describe("insuranceIncluded getter tests", function () {
        it("should return false if insuranceIncluded not changed", () => {
            expect(holidayPackage.insuranceIncluded).to.be.equal(false);
        });
        it("should return true if insuranceIncluded changed", () => {
            let holidayPackage = new HolidayPackage("Sofia", "Bulgaria");
            holidayPackage.insuranceIncluded = true;
            expect(holidayPackage.insuranceIncluded).to.be.equal(true);
        });
    });
    describe("insuranceIncluded setter tests", function () {
        it("with invalid parameter, should throw error", () => {
            expect(() => holidayPackage.insuranceIncluded = "true").to.throw(Error, "Insurance status must be a boolean");
        });
        it("with valid parameter, should throw error", () => {
            holidayPackage.insuranceIncluded = true;
            expect(holidayPackage.insuranceIncluded).to.be.equal(true);
        });
    });
    describe("generateHolidayPackage tests", function () {
        it("with no vacationers, should throw error", () => {
            let holidayPackage = new HolidayPackage("Sofia", "Winter");
            expect(() => holidayPackage.generateHolidayPackage()).to.throw(Error, "There must be at least 1 vacationer added");
        });
        it("with summer as season, should return correct price", () => {
            holidayPackage.addVacationer("Pesho Petrov");
            expect(holidayPackage.generateHolidayPackage()).to.be.equal("Holiday Package Generated\nDestination: Sofia\nVacationers:\nPesho Petrov\nPrice: 600");
            holidayPackage.addVacationer("Gosho Georgiev");
            expect(holidayPackage.generateHolidayPackage()).to.be.equal("Holiday Package Generated\nDestination: Sofia\nVacationers:\nPesho Petrov\nGosho Georgiev\nPrice: 1000");
            holidayPackage.insuranceIncluded = true;
            expect(holidayPackage.generateHolidayPackage()).to.be.equal("Holiday Package Generated\nDestination: Sofia\nVacationers:\nPesho Petrov\nGosho Georgiev\nPrice: 1100");
            holidayPackage = new HolidayPackage("Sofia", "Spring");
            holidayPackage.addVacationer("Pesho Petrov");
            expect(holidayPackage.generateHolidayPackage()).to.be.equal("Holiday Package Generated\nDestination: Sofia\nVacationers:\nPesho Petrov\nPrice: 400");
        });
    });
});

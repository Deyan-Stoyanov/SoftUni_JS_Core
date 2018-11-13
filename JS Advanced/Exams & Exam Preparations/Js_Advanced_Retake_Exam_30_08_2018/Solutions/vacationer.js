class Vacationer {
    constructor(fullName, creditCard) {
        this.fullName = fullName;
        this.idNumber = this.generateIDNumber();
        if (creditCard !== undefined) {
            this.addCreditCardInfo(creditCard);
        } else {
            this.creditCard = {
                cardNumber: 1111,
                expirationDate: "",
                securityNumber: 111
            };
        }
        this.wishList = [];
    }

    get fullName() {
        return this._fullName;
    }

    set fullName(fullName) {
        if (fullName.length != 3) {
            throw new Error("Name must include first name, middle name and last name");
        }
        let firstName = fullName[0];
        let middleName = fullName[1];
        let lastName = fullName[2];
        let regex = new RegExp("^[A-Z][a-z]+$");
        if (!(regex.test(firstName) && regex.test(middleName) && regex.test(lastName))) {
            throw new Error("Invalid full name");

        }
        this._fullName = {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName
        };
    }

    generateIDNumber() {
        return (231 * this.fullName.firstName.charCodeAt(0)) + (139 * this.fullName.middleName.length) + "" + (["a", "e", "i", "o", "u"].includes(this.fullName.lastName.charAt(this.fullName.lastName.length - 1)) ? 8 : 7);
    }

    addCreditCardInfo(input) {
        if (input.length !== 3) {
            throw new Error("Missing credit card information");
        }
        let cardNumber = input[0];
        let expirationDate = input[1];
        let securityNumber = input[2];
        if (typeof cardNumber != "number" || typeof securityNumber != "number") {
            throw new Error("Invalid credit card details");
        }
        this.creditCard = {
            cardNumber: cardNumber,
            expirationDate: expirationDate,
            securityNumber: securityNumber
        };
    }

    addDestinationToWishList(destination) {
        if (this.wishList.includes(destination)) {
            throw new Error("Destination already exists in wishlist");
        }
        this.wishList.push(destination);
        this.wishList = this.wishList.sort((x, y) => x.length - y.length);
    }

    getVacationerInfo() {
        return `Name: ${this.fullName.firstName} ${this.fullName.middleName} ${this.fullName.lastName}\nID Number: ${this.idNumber}\nWishlist:\n${this.wishList.length == 0 ? "empty" : this.wishList.join(", ")}\nCredit Card:\nCard Number: ${this.creditCard.cardNumber}\nExpiration Date: ${this.creditCard.expirationDate}\nSecurity Number: ${this.creditCard.securityNumber}`;
    }
}


// let vacationer1 = new Vacationer(["Vania", "Ivanova", "Zhivkova"]);
// let vacationer2 = new Vacationer(["Tania", "Ivanova", "Zhivkova"], [123456789, "10/01/2018", 777]);
// vacationer1.addDestinationToWishList('Spain');
// vacationer1.addDestinationToWishList('Germany');
// vacationer1.addDestinationToWishList('Bali');

// console.log(vacationer1.getVacationerInfo());
// console.log(vacationer2.getVacationerInfo());

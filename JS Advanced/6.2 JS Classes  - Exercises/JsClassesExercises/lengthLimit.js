class Stringer {
    constructor(string, length) {
        this.innerString = string;
        this.innerLength = length;
    }
    decrease(length) {
        this.innerLength = this.innerLength - length < 0 ? 0 : this.innerLength - length;
    }
    increase(length) {
        this.innerLength = this.innerLength + length;
    }
    toString() {
        if (this.innerLength < this.innerString.length) {
            return this.innerString.substring(0, this.innerLength) + "...";
        }
        return this.innerString;
    }
}

let test = new Stringer("Test", 5);
console.log(test.toString());
test.decrease(3);
console.log(test.toString());
test.decrease(5);
console.log(test.toString());
test.increase(4);
console.log(test.toString());

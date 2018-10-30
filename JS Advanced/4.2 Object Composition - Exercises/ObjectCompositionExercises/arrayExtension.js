(function solve() {
    Array.prototype.last = function() {
        return this[this.length - 1];
    };

    Array.prototype.skip = function(n) {
        let newArr = this.slice(n);
        return newArr;
    };

    Array.prototype.take = function(n)  {
        let newArr = this.slice(0, n);
        return newArr;
    };

    Array.prototype.sum = function() {
        let sum = this.reduce((acc, cur) => {
            return acc + cur;
        }, 0);
        return sum;
    };

    Array.prototype.average = function() {
        let sum = this.sum();
        return sum / this.length;
    };
})();


let arr = [1, 2, 3];
console.log(arr.average());

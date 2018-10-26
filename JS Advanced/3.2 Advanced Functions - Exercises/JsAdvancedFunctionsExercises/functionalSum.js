let add = (function () {
    let sum = 0;
    return function sumNumbers(n) {
        sum += n;
        sumNumbers.toString = () => sum;
        return sumNumbers;
    };
})();



console.log((add(1)(1)(1)(1)).toString());

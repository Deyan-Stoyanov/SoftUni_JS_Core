function getFibonator() {
    let n = 0;
    let n1 = 1;
    return function() {
        let n2 = n + n1;
        n = n1;
        n1 = n2;
        return n;
    };
}
let fib = getFibonator();
console.log(fib());


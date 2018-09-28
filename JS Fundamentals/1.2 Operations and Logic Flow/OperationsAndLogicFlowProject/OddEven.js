function checkNumber(n){
    return Number.isInteger(n) ? (+n % 2 === 0 ? 'even' : 'odd') : 'invalid';
}
console.log(checkNumber(6.2));

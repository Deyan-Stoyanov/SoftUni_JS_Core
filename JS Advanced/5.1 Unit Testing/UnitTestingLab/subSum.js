function subsum(arr, startIndex, endIndex) {
    if (!Array.isArray(arr)) {
        return NaN;
    }
    if (!startIndex || startIndex < 0) {
        startIndex = 0;
    }
    if (!endIndex || endIndex >= arr.length) {
        endIndex = arr.length - 1;
    }
    let sum = arr.filter((el, index) => index >= startIndex && index <= endIndex).map(x => +x).reduce((acc, cur) => {
        return acc + Number(cur);
    }, 0);
    return sum;
}

console.log(subsum([10, 30, 40, 50, 60,"t"], 3, 300));

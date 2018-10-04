function findSmallestTwoNumbers(arr) {
    return arr.sort((element1, element2) => {
            return element1 - element2;
        })
        .slice(0, 2)
        .join(' ');
}
console.log(findSmallestTwoNumbers([30, 15, 50, 5]));

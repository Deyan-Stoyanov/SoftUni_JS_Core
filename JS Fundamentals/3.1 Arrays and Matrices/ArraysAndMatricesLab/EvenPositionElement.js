function printEvenElements(arr) {
    return arr.filter((element, index) => {
            return index % 2 === 0;
        })
        .join(' ');
}
console.log(printEvenElements(['20', '30', '40']));

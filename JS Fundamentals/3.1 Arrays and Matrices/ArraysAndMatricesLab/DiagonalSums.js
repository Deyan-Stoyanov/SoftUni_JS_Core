function calculateSums(matrix) {
    let firstDiagonal = matrix.map((element) => {
            return element[matrix.indexOf(element)];
        })
        .reduce((acc, el) => {
            return acc += el;
        }, 0);

    let secondDiagonal = matrix.map((element) => {
            return element[matrix.length - matrix.indexOf(element) - 1];
        })
        .reduce((acc, el) => {
            return acc += el;
        }, 0);
    return [firstDiagonal, secondDiagonal].join(' ');
}
console.log(calculateSums([
    [20, 40],
    [10, 60]
]));

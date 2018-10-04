function checkDiagonals(matrix) {
    matrix = matrix.map(row => row.split(' ').map((x) => +x));
    let firstDiagonalSum = 0;
    let secondDiagonalSum = 0;
    for (let i = 0; i < matrix.length; i++) {
        firstDiagonalSum += matrix[i][i];
        secondDiagonalSum += matrix[i][matrix.length - i - 1];
    }
    if (firstDiagonalSum === secondDiagonalSum) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if (i !== j && j !== matrix[i].length - i - 1) {
                    matrix[i][j] = firstDiagonalSum;
                }
            }
        }
    }
    return matrix.map((x) => x.join(' ')).join('\r\n');
}

console.log(checkDiagonals(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1'
]));

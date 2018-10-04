function assertmatrix(matrix) {
    let sum = matrix[0].reduce((x, y) => x + y);
    for (let i = 1; i < matrix.length; i++) {
        let sumRows = matrix[i].reduce((x, y) => x + y);
        if (sumRows != sum) {
            return false;
        }
    }
    for (let k = 0; k < matrix.length; k++) {
        let sumCols = 0;
        for (let l = 0; l < matrix[k].length; l++) {
            try {
                sumCols += matrix[l][k];
            } catch (ex) {}
        }
        if (sumCols != sum) {
            return false;
        }
    }
    return true;
}

console.log(assertmatrix([
    [11, 32, 45],
    [21, 0, 1],
    [21, 1, 1]
]));

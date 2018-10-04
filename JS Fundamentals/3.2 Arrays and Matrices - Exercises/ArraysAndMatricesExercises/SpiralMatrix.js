function drawMatrix(rows, cols) {
    let matrix = [];
    for (let a = 0; a < rows; a++) {
        let row = [];
        for (let b = 0; b < cols; b++) {
            row.push(0);
        }
        matrix.push(row);
    }
    let number = 1;
    let row = currentRow = rows,
        column = currentColumn = cols;

    while (currentRow > row / 2) {

        for (let i = (column - currentColumn); i < currentColumn; i++) {
            matrix[row - currentRow][i] = number++;
        }

        for (let i = (row - currentRow + 1); i < currentRow; i++) {
            matrix[i][currentColumn - 1] = number++;
        }

        for (let i = currentColumn - 1; i > (column - currentColumn); i--) {
            matrix[currentRow - 1][i - 1] = number++;
        }

        for (let i = currentRow - 1; i > (row - currentRow + 1); i--) {
            matrix[i - 1][column - currentColumn] = number++;
        }

        currentRow--;
        currentColumn--;
    }
    return matrix.map((x) => x.join(' ')).join('\r\n');
}
console.log(drawMatrix(5, 5));

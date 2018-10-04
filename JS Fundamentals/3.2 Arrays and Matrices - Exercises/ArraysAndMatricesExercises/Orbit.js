function drawOrbit([matrixLength, matrixWidth, pointX, pointY]){
    let matrix = [];
    for (let i = 0; i < matrixLength; i++) {
        let row = [];
        for (let j = 0; j < matrixWidth; j++) {
            row.push(0);
        }
        matrix.push(row);
    }
    matrix[pointX][pointY] = 1;
    for (let i = 0; i < matrixLength; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = 1 + (Math.max(Math.abs(i - pointX), Math.abs(j - pointY)));
        }
    }
    return matrix.map((x) => x.join(' ')).join('\r\n');
}
console.log(drawOrbit([4, 4, 0, 0]));

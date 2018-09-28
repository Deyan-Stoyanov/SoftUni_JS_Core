function drawChessBoard(n) {
    let result = '<div class="chessboard">';
    for (let i = 0; i < n; i++) {
        result += '\r\n    <div>';
        for (let j = 0; j < n; j++) {
            let color = 'white';
            if (i % 2 === 0) {
                if (j % 2 === 0) {
                    color = 'black';
                } else {
                    color = 'white';
                }
            } else {
                if (j % 2 === 0) {
                    color = 'white';
                } else {
                    color = 'black';
                }
            }
            result += `\r\n        <span class="${color}"></span>`;
        }
        result += '\r\n    </div>';
    }
    result += '\r\n</div>';
    return result;
}

console.log(drawChessBoard(3));

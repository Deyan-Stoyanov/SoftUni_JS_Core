function drawHelix(n) {
    let sequence = 'ATCGTTAGGG';
    let index = 0;
    let result = '';
    for (let i = 0; i < n; i++) {
        if (index > sequence.length - 1) {
            index = 0;
        }
        if (i % 4 == 0) {
            result += `**${sequence[index++]}${sequence[index++]}**\r\n`;
        } else if (i % 2 == 0) {
            result += `${sequence[index++]}----${sequence[index++]}\r\n`;
        } else {
            result += `*${sequence[index++]}--${sequence[index++]}*\r\n`;
        }
    }
    return result;
}

console.log(drawHelix(10));

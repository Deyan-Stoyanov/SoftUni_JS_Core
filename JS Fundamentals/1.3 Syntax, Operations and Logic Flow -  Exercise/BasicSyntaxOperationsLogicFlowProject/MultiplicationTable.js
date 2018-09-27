function multiplicationTable(n) {
    let table = '';
    table += ('<table border="1">');
    let firstRow = '<tr><th>x</th>';
    for (let a = 0; a < n; a++) {
        firstRow += `<th>${a + 1}</th>`;
    }
    firstRow += '</tr>';
    table +=(firstRow);
    for (let i = 1; i <= n; i++) {
        let row = `<tr><th>${i}</th>`;
        for (let j = 1; j <= n; j++) {
            row += `<td>${j * i}</td>`;
        }
        row += '</tr>';
        table +=(row);
    }
    table +=('</table>');

    return table;
}

function parseJsonToHtml(arr) {
    let result = '<table>';
    for (let str of arr) {
        let json = JSON.parse(str);
        result += `\n	<tr>\n		<td>${json['name']}</td>\n		<td>${json['position']}</td>\n		<td>${json['salary']}</td>\n	</tr>`;
    }
    result += '\n</table>';
    return result;
}

console.log(parseJsonToHtml(['{"name":"Pesho","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}'
]));

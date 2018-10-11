function scoreToHtml(score) {
    function escapeHtmlChars(str) {
        str = str.replace(/&/g, '&amp;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        return str;
    }
    let result = '<table>\n   <tr><th>name</th><th>score</th></tr>';
    let arr = JSON.parse(score);
    for (let s of arr) {
        result += `\n  <tr><td>${escapeHtmlChars(s['name'])}` + `</td><td>${s['score']}</td></tr>`;
    }
    result += '\n</table>';
    return result;
}

console.log(scoreToHtml(['[{"name":"Pesho","score":479},{"name":"Gosho","score":205}]']));

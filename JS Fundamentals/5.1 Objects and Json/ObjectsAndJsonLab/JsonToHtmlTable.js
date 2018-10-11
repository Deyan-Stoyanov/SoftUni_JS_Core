function parseToHtml(json) {
    function escapeHtmlChars(str) {
        str = str.replace(/&/g, '&amp;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        return str;
    }
    let result = '<table>';
    let arr = JSON.parse(json);
    result += '\n   <tr>';
    for (let key of Object.keys(arr[0])) {
        result += `<th>${escapeHtmlChars(key)}</th>`;
    }
    result += '</tr>';
    for (let s of arr) {
        let values = Object.values(s);
        result += '\n  <tr>';
        for (let v of values) {
            result += `<td>${escapeHtmlChars(v.toString())}</td>`;
        }
        result += `</tr>`;
    }
    result += '\n</table>';
    return result;
}


console.log(parseToHtml(['[{"Name":"Tomatoes & Chips","Price":2.35},{"Name":"J&B Chocolate","Price":0.96}]']));

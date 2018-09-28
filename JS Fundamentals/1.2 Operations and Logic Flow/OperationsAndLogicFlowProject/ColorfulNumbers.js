function generateHTML(n){
    let result = '<ul>';
    for (let i = 0; i < n; i++) {
        let color = i % 2 === 0 ? 'green' : 'blue';
        result += `\r\n    <li><span style='color:${color}'>${i + 1}</span></li>`;
    }
    result += '\r\n</ul>';
    return  result;
}

console.log(generateHTML(10));

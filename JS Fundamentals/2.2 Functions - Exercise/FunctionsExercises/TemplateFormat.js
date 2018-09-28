function printXML(arr) {
    function template(text) {
        return `<?xml version="1.0" encoding="UTF-8"?>\r\n<quiz>${text}\r\n</quiz>`;
    }
    let result = '';
    for (let i = 0; i < arr.length; i += 2) {
        result += `\r\n    <question>\r\n       ${arr[i]}\r\n    </question>`;
        result += `\r\n    <answer>\r\n     ${arr[i + 1]}\r\n    </answer>`;
    }
    return template(result);
}

console.log(printXML(['Dry ice is a frozen form of which gas?',
    'Carbon Dioxide',
    'What is the brightest star in the night sky?',
    'Sirius'
]));

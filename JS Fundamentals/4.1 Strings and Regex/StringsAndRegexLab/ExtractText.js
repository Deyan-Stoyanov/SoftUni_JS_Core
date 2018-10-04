function extractText(str){
    let arr = [];
    while(str.indexOf('(') !== -1 && str.indexOf(')') !== -1){
        arr.push(str.slice(str.indexOf('(') + 1, str.indexOf(')')));
        str = str.substring(str.indexOf('(') + 1);
        str = str.substring(str.indexOf(')') + 1);
    }
    return arr.join(', ');
}

console.log(extractText('Rakiya (Bulgarian brandy) is self-made liquor (alcoholic drink)'));

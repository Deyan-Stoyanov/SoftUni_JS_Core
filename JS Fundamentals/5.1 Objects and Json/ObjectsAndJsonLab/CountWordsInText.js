function countWords([text]) {
    let arr = text.split(/[^a-zA-Z0-9_]+/g).filter(x => x !== '');
    let obj = {};
    for (let str of arr) {
        if(!obj.hasOwnProperty(str)){
            obj[str] = 0;
        }
        obj[str]++;
    }
    return JSON.stringify(obj);
}

console.log(countWords(['Far too slow, you\'re far too slow.']));

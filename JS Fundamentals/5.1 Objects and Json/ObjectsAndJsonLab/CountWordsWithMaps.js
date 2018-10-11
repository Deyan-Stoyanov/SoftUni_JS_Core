function countWordsWithMap([text]){
    let map = new Map();
    text = text.split(/[^a-zA-Z0-9_]/g).filter(x => x !== '');
    for (let str of text) {
        if(!map.has(str.toLowerCase())){
            map.set(str.toLowerCase(), 0);
        }
        map.set(str.toLowerCase(), map.get(str.toLowerCase()) + 1);
    }
    let arr = Array.from(map.keys()).sort();
    for (let key of arr) {
        console.log(`'${key}' -> ${map.get(key)} times`);
    }
}

countWordsWithMap(['Far too slow, you\'re far too slow.']);

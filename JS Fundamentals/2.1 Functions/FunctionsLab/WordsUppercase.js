function toUpper(words) {
    function extractWords(words) {
        return words.split(/\W+/);
    }
    let arr = extractWords(words);
    arr = arr.filter(x => x != '');
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].toUpperCase();
    }
    return arr.join(', ');
}

console.log(toUpper('Hi, how are you?'));

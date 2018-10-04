function matchAllWords(text){
    let regex = /[a-zA-Z0-9_]+/g;
    let match = text.match(regex);
    return match.join('|');
}

console.log(matchAllWords('_(Underscores) are also word characters'));

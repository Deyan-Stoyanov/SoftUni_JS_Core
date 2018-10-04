function countOccurences(str, text){
    let occ = 0;
    while(text.indexOf(str) !== -1){
        occ++;
        text = text.slice(text.indexOf(str) + str.length - 1);
    }
    return occ;
}

console.log(countOccurences('the', 'The quick brown fox jumps over the lay dog.'));

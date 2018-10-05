function countWordOccurencies(text, word) {
    let regex = new RegExp(`\\b${word}\\b`, 'gmi');
    let matches = text.match(regex);
    return matches === null ? 0 : matches.length;
    // word = word.toLowerCase();
    // return text.match(/[\w]+/g).map(a => a.toLowerCase()).filter(x => x == word).length;
}

console.log(countWordOccurencies('How do you plan on achieving that? How? How can you even think of that?',
    'how'
));

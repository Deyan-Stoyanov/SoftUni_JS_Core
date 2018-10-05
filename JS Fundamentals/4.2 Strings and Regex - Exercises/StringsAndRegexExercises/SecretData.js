function secretData(arr) {
    let regex = /((\*[A-Z][a-z]+)|(\+[0-9\-]{10})|(\![A-Za-z0-9]+)|(\_[A-Za-z0-9]+))($|[\s])/g;
    let str = arr.join('\n');
    let matches = str.match(regex);
    for (let m of matches) {
        while(str.indexOf(m) !== -1){
            str = str.replace(m.substring(0, m.length - 1), '|'.repeat(m.length - 1));
        }
    }
    return str;
}

console.log(secretData(['I think it was +555-49-796',
    'I can\'t really remember...',
    'He said something about "finishing work"', 'with subject !2491a23BVB34Q and returning to Base _Aurora21',
    'Then after that he disappeared from my sight.',
    'As if he vanished in the shadows.',
    'A moment, shorter than a second, later, I saw the person flying off the top floor.',
    'I really don\'t know what happened there.',
    'This is all I saw, that night.',
    'I cannot explain it myself...'
]));

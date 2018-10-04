function sortArray(arr) {
    function compare(first, second){
        return first.length - second.length || first.localeCompare(second);
    }
    return arr.sort(compare).join('\r\n');
}

console.log(sortArray(['test',
    'Deny',
    'omen',
    'Default'
]));

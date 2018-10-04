function rotateArray(arr) {
    let n = arr.pop() % arr.length;
    while (n-- > 0) {
        arr.unshift(arr.pop());
    }
    return arr.join(' ');
}

console.log(rotateArray(['Banana',
    'Orange',
    'Coconut',
    'Apple',
    '15'
]));

function printArray(arr) {
    console.log(arr.splice(0, arr.length - 1).join(arr[arr.length - 1]));
}

printArray(['One',
    'Two',
    'Three',
    'Four',
    'Five',
    '-'
]);

function generateArray(arr) {
    let myArray = [];
    let number = 1;
    for (let i = 0; i < arr.length; i++) {
        let command = arr[i];
        switch (command) {
        case 'add':
            myArray.push(number++);
            break;
        case 'remove':
            if (myArray.length >= 0) {
                myArray.pop();
            }
            number++;
            break;
        }
    }
    myArray.length === 0 ? console.log('Empty') : myArray.forEach(x => console.log(x));
}

generateArray(['add',
    'add',
    'remove',
    'add',
    'add'
]);

function printElements(arr) {
    let step = arr[arr.length - 1];
    arr.splice(0, arr.length - 1).filter((element, index) => {
        return index % step === 0;
    }).forEach((x) => console.log(x));
}

printElements(['5',
    '20',
    '31',
    '4',
    '20',
    '2'
]);

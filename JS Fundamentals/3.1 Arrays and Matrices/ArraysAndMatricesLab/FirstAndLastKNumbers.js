function getNumbers(arr) {
    let number = +arr[0];
    let newArr = arr.slice(1);
    console.log(newArr.filter((element, index) => {
            return index < number;
        })
        .join(' '));
    console.log(newArr.filter((element, index) => {
            return index >= newArr.length - number;
        })
        .join(' '));
}

getNumbers([2, 7, 8, 9]);

function process(arr){
    return arr.filter((element, index) => {
        return index % 2 != 0;
    })
    .map((element) => {
        return element * 2;
    })
    .reverse()
    .join(' ');
}

console.log(process([10, 15, 20, 25]));

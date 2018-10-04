function shiftNumbers(arr){
    let newArr = [];
    for (let element of arr) {
        if(element >= 0){
            newArr.push(element);
        } else{
            newArr.unshift(element);
        }
    }
    return newArr;
}
console.log(shiftNumbers([3, -2, 0, -1]));

function modifyAverage(number) {
    function checkAverage(number) {
        number += '';
        let sum = 0;
        for (let i = 0; i < number.length; i++) {
            sum += +number[i];
        }
        return sum / number.length;
    }
    while(checkAverage(number) <= 5){
        number += '9';
        number = +number;
    }
    return number;
}

console.log(modifyAverage(583));

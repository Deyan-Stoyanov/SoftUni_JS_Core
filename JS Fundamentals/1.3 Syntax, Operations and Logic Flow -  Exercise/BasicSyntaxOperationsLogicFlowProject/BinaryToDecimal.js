function convertToDecimal(binary){
    let j = 0;
    let sum = 0;
    for (let i = binary.length; i > 0; i--) {
        sum += (2 ** j) * +(binary.charAt(i - 1));
        j++;
    }
    console.log(sum);
}

convertToDecimal('11110000');

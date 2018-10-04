function calculateBill(arr){
    let products = [];
    let bill = 0.0;
    for (let i = 0; i < arr.length; i += 2) {
        products.push(arr[i]);
        bill += +(arr[i + 1]);
    }
    console.log(`You purchased ${products.join(', ')} for a total sum of ${bill}`);
}

calculateBill(['Beer Zagorka', '2.65', 'Tripe soup', '7.80','Lasagna', '5.69']);

function calculateMoney(arr) {
    let coffeeCafeinePrice = 0.8;
    let coffeeDecafPrice = 0.9;
    let teaPrice = 0.8;
    let milkMultiplier = 0.1;
    let sugarPrice = 0.1;
    let income = 0;
    for (let str of arr) {
        str = str.split(', ').filter(x => x !== '');
        let moneyInserted = +(str[0]);
        let type = str[1];
        let total;
        if(type === 'coffee'){
            let typeOfCoffee = str[2];
            if(typeOfCoffee === 'caffeine'){
                total = coffeeCafeinePrice;
            } else{
                total = coffeeDecafPrice;
            }
            if(str.length === 5){
                if(str[3] === 'milk'){
                    total += +(total * milkMultiplier).toFixed(1);
                }
                if(str[4] != 0){
                    total += 0.1;
                }
            } else if(str.length === 4){
                if(str[3] != 0){
                    total += 0.1;
                }
            }
        } else if(type === 'tea'){
            total = teaPrice;
            if(str.length === 4){
                if(str[2] === 'milk'){
                    total += +(total * milkMultiplier).toFixed(1);
                }
                if(str[3] != 0){
                    total += 0.1;
                }
            } else if(str.length === 3){
                if(str[3] != 0){
                    total += 0.1;
                }
            }
        }
        if(total <= moneyInserted){
            console.log(`You ordered ${type}. Price: ${total.toFixed(2)}$ Change: ${(moneyInserted - total).toFixed(2)}$`)
            income += total;
        } else {
            console.log(`Not enough money for ${type}. Need ${(total - moneyInserted).toFixed(2)}$ more.`);
        }
    }
    console.log(`Income Report: ${income.toFixed(2)}$`);
}

calculateMoney(['1.00, coffee, caffeine, milk, 4',
    '0.40, tea, milk, 2',
    '1.00, coffee, decaf, 0'
]);

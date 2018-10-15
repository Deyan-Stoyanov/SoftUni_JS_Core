function mineBitcoins(arr) {
    let money = 0;
    let bitCoinsBought = 0;
    let dayOfFirstBitcoin = 0;
    let bitcointToLevExchangeRate = 11949.16;
    let goldToLevExchangeRate = 67.51;
    for (let day in arr) {
        let goldInGrams;
        if ((day + 1) % 3 === 0) {
            goldInGrams = (+arr[day] * 0.7);
        } else {
            goldInGrams = +(arr[day]);
        }
        money += goldInGrams * goldToLevExchangeRate;
        while (money > bitcointToLevExchangeRate) {
            if (dayOfFirstBitcoin === 0) {
                dayOfFirstBitcoin = +day + 1;
            }
            bitCoinsBought++;
            money -= bitcointToLevExchangeRate;
        }
    }
    console.log(`Bought bitcoins: ${bitCoinsBought}`);
    if (dayOfFirstBitcoin !== 0) {
        console.log(`Day of the first purchased bitcoin: ${dayOfFirstBitcoin}`);
    }
    console.log(`Left money: ${money.toFixed(2)} lv.`);
}

mineBitcoins([3124.15, 504.212, 2511.124]);

function processMoney(arr) {
    let atm = [];
    for (let commandArr of arr) {
        if (commandArr.length > 2) {
            commandArr = commandArr.map(x => +x);
            atm = atm.concat(commandArr);
            let moneyInserted = commandArr.reduce((acc, b) => {
                return acc += b;
            }, 0);
            let totalBalance = atm.reduce((acc, b) => {
                return acc += b;
            }, 0);
            console.log(`Service Report: ${moneyInserted}$ inserted. Current balance: ${totalBalance}$.`);
        } else if (commandArr.length === 2) {
            let ballance = +commandArr[0];
            let moneyToWithdraw = +commandArr[1];
            let totalBalance = atm.reduce((acc, b) => {
                return acc += b;
            }, 0);
            if (ballance < moneyToWithdraw) {
                console.log(`Not enough money in your account. Account balance: ${ballance}$.`);
            } else if (totalBalance < moneyToWithdraw) {
                console.log(`ATM machine is out of order!`);
            } else {
                let money = moneyToWithdraw;
                atm = atm.sort((x, y) => {
                    return y - x;
                });
                for (let i = 0; i < atm.length; i++) {
                    if (atm[i] <= money) {
                        money -= atm[i];
                        let tempArr = [];
                        for (let index in atm) {
                            if (index != i) {
                                tempArr.push(atm[index]);
                            }
                        }
                        atm = tempArr;
                        i--;
                    }
                    if (money === 0) {
                        console.log(`You get ${moneyToWithdraw}$. Account balance: ${ballance - moneyToWithdraw}$. Thank you!`);
                        break;
                    }
                }
            }
        } else if (commandArr.length === 1) {
            let banknotesOfType = atm.filter(x => x === +(commandArr[0])).length;
            console.log(`Service Report: Banknotes from ${commandArr[0]}$: ${banknotesOfType}.`);
        }
    }
}

processMoney([
    [20, 5, 100, 20, 1],
    [457, 25],
    [1],
    [10, 10, 5, 20, 50, 20, 10, 5, 2, 100, 20],
    [20, 85],
    [5000, 4500],
]);

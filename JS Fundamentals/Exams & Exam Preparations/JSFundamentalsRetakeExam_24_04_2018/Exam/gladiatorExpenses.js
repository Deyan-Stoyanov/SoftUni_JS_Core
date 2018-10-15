function calculateExpenses(lostFights, helmetPrice, swordPrice, shieldPrice, armorPrice) {
    let helmetExpenses = Math.floor(lostFights / 2) * helmetPrice;
    let swordExpenses = Math.floor(lostFights / 3) * swordPrice;
    let shieldExpenses = Math.floor(lostFights / 6) * shieldPrice;
    let armorExpenses = Math.floor(lostFights / 12) * armorPrice;
    let total = (helmetExpenses + swordExpenses + shieldExpenses + armorExpenses).toFixed(2);
    return `Gladiator expenses: ${total} aureus`;
}

console.log(calculateExpenses(7,
    2,
    3,
    4,
    5
));

function commandGladiators(arr) {
    function compareTechniques(map1, map2) {
        let arr1 = Array.from(map1.keys());
        let arr2 = Array.from(map2.keys());
        for (let t of arr1) {
            if (arr2.filter(x => x === t).length > 0) {
                return true;
            }
        }
        return false;
    }
    let arena = new Map();
    for (let str of arr) {
        if (str.includes('vs')) {
            str = str.split(' vs ').filter(x => x !== '');
            let firstGladiator = str[0];
            let secondGladiator = str[1];
            if (arena.has(firstGladiator) && arena.has(secondGladiator)) {
                if (compareTechniques(arena.get(firstGladiator), arena.get(secondGladiator))) {
                    let firstTotalSkill = Array.from(arena.get(firstGladiator).values()).reduce((acc, s) => {
                        return acc += s;
                    }, 0);
                    let secondTotalSkill = Array.from(arena.get(secondGladiator).values()).reduce((acc, s) => {
                        return acc += s;
                    }, 0);
                    if (firstTotalSkill > secondTotalSkill) {
                        arena.delete(secondGladiator);
                    } else {
                        arena.delete(firstGladiator);
                    }
                }
            }
        } else if (str.includes('Ave Cesar')) {
            break;
        } else {
            str = str.split(' -> ').filter(x => x !== '');
            let gladiatorName = str[0];
            let technique = str[1];
            let skill = +str[2];
            if (!arena.has(gladiatorName)) {
                arena.set(gladiatorName, new Map());
            }
            if (!arena.get(gladiatorName).has(technique)) {
                arena.get(gladiatorName).set(technique, skill);
            }
            if (arena.get(gladiatorName).get(technique) <= skill) {
                arena.get(gladiatorName).set(technique, skill);
            }
        }
    }
    let gladiators = Array.from(arena.keys()).sort((x, y) => {
        if (Array.from(arena.get(y).values()).reduce((acc, s) => {
            return acc += s;
        }, 0) === Array.from(arena.get(x).values()).reduce((acc, s) => {
            return acc += s;
        }, 0)) {
            return x.localeCompare(y);
        }
        return Array.from(arena.get(y).values()).reduce((acc, s) => {
            return acc += s;
        }, 0) - Array.from(arena.get(x).values()).reduce((acc, s) => {
            return acc += s;
        }, 0);
    });
    for (let g of gladiators) {
        let totalSkill = Array.from(arena.get(g).values()).reduce((acc, s) => {
            return acc += s;
        }, 0);
        console.log(`${g}: ${totalSkill} skill`);
        let techniques = Array.from(arena.get(g).keys()).sort((a, b) => {
            if (arena.get(g).get(b) === arena.get(g).get(a)) {
                return a.localeCompare(b);
            }
            return arena.get(g).get(b) - arena.get(g).get(a);
        });
        for (let t of techniques) {
            console.log(`- ${t} <!> ${arena.get(g).get(t)}`);
        }
    }
}

commandGladiators(['Pesho -> BattleCry -> 400',
    'Gosho -> PowerPunch -> 300',
    'Stamat -> Duck -> 200',
    'Stamat -> Tiger -> 250',
    'Ave Cesar'
]);

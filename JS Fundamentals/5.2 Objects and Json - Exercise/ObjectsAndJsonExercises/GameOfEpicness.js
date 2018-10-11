function getWinner(info, battles) {
    function getTotalWins(kingdom, arena) {
        let generalNames = Array.from(Object.keys(arena[kingdom]));
        let totalWins = 0;
        for (let key of generalNames) {
            totalWins += arena[kingdom][key].wins;
        }
        return totalWins;
    }

    function getTotalLosses(kingdom, arena) {
        let generalNames = Array.from(Object.keys(arena[kingdom]));
        let totalLosses = 0;
        for (let key of generalNames) {
            totalLosses += arena[kingdom][key].losses;
        }
        return totalLosses;
    }

    let arena = {};
    for (let obj of info) {
        if (!arena.hasOwnProperty(obj.kingdom)) {
            arena[obj.kingdom] = {};
        }
        if (!arena[obj.kingdom].hasOwnProperty(obj.general)) {
            arena[obj.kingdom][obj.general] = {};
            arena[obj.kingdom][obj.general]['army'] = 0;
        }
        arena[obj.kingdom][obj.general]['army'] = arena[obj.kingdom][obj.general]['army'] + obj.army;
        arena[obj.kingdom][obj.general]['wins'] = 0;
        arena[obj.kingdom][obj.general]['losses'] = 0;
    }

    for (let arr of battles) {
        let firstKingdom = arr[0];
        let firstGeneral = arr[1];
        let secondKingdom = arr[2];
        let secondGeneral = arr[3];
        if (firstKingdom === secondKingdom) {
            continue;
        }
        let firstArmy = arena[firstKingdom][firstGeneral].army;
        let secondArmy = arena[secondKingdom][secondGeneral].army;
        if (firstArmy > secondArmy) {
            arena[firstKingdom][firstGeneral].army = Math.floor(arena[firstKingdom][firstGeneral].army * 1.1);
            arena[secondKingdom][secondGeneral].army = Math.floor( arena[secondKingdom][secondGeneral].army * 0.9);
            arena[firstKingdom][firstGeneral].wins = arena[firstKingdom][firstGeneral].wins + 1;
            arena[secondKingdom][secondGeneral].losses = arena[secondKingdom][secondGeneral].losses  + 1;
        } else if (firstArmy < secondArmy) {
            arena[firstKingdom][firstGeneral].army = Math.floor(arena[firstKingdom][firstGeneral].army * 0.9);
            arena[secondKingdom][secondGeneral].army = Math.floor( arena[secondKingdom][secondGeneral].army * 1.1);
            arena[secondKingdom][secondGeneral].wins = arena[secondKingdom][secondGeneral].wins + 1;
            arena[firstKingdom][firstGeneral].losses  = arena[firstKingdom][firstGeneral].losses  + 1;
        }
    }
    let winner = Array.from(Object.keys(arena)).sort((a, b) => {
        if (getTotalWins(b, arena) === getTotalWins(a, arena)) {
            if (getTotalLosses(a, arena) === getTotalLosses(b, arena)) {
                return a.localeCompare(b);
            }
            return getTotalLosses(a, arena) - getTotalLosses(b, arena);
        }
        return getTotalWins(b, arena) - getTotalWins(a, arena);
    })[0];
    console.log(`Winner: ${winner}`);
    let generalKeys = Array.from(Object.keys(arena[winner])).sort((a, b) => {
        return arena[winner][b].army - arena[winner][a].army;
    });
    for (let key of generalKeys) {
        console.log(`/\\general: ${key}`);
        console.log(`---army: ${arena[winner][key].army}`);
        console.log(`---wins: ${arena[winner][key].wins}`);
        console.log(`---losses: ${arena[winner][key].losses}`);
    }
}

getWinner([{
            kingdom: 'Maiden Way',
            general: 'Merek',
            army: 5000
        },
        {
            kingdom: 'Stonegate',
            general: 'Ulric',
            army: 4900
        },
        {
            kingdom: 'Stonegate',
            general: 'Doran',
            army: 70000
        },
        {
            kingdom: 'YorkenShire',
            general: 'Quinn',
            army: 0
        },
        {
            kingdom: 'YorkenShire',
            general: 'Quinn',
            army: 2000
        },
        {
            kingdom: 'Maiden Way',
            general: 'Berinon',
            army: 100000
        }
    ],
    [
        ['YorkenShire', 'Quinn', 'Stonegate', 'Ulric'],
        ['Stonegate', 'Ulric', 'Stonegate', 'Doran'],
        ['Stonegate', 'Doran', 'Maiden Way', 'Merek'],
        ['Stonegate', 'Ulric', 'Maiden Way', 'Merek'],
        ['Maiden Way', 'Berinon', 'Stonegate', 'Ulric']
    ]
);

function addTowns(arr) {
    let towns = {};
    for (let i = 0; i < arr.length; i += 2) {
        let townName = arr[i];
        let population = +(arr[i + 1]);
        if (!towns.hasOwnProperty(townName)) {
            towns[townName] = 0;
        }
        towns[townName] = towns[townName] + population;
    }
    return JSON.stringify(towns);
}

console.log(addTowns(['Sofia',
    '20',
    'Varna',
    '3',
    'sofia',
    '5',
    'varna',
    '4'
]));

function calculatePopulation(arr) {
    let obj = {};
    for (let str of arr) {
        str = str.split(' <-> ').filter(x => x !== '');
        let town = str[0];
        let population = +str[1];
        if (!obj.hasOwnProperty(town)) {
            obj[town] = 0;
        }
        obj[town] = obj[town] + population;
    }
    for (let t of Object.keys(obj)) {
        console.log(`${t} : ${obj[t]}`);
    }
}

calculatePopulation(['Sofia <-> 1200000',
    'Montana <-> 20000',
    'New York <-> 10000000',
    'Washington <-> 2345000',
    'Las Vegas <-> 1000000',
    'New York <-> 1'
]);

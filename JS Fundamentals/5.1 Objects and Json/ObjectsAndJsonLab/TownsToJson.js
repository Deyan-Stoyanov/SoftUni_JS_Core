function parseTowns(arr) {
    let towns = [];
    arr = arr.slice(1);
    for (let t of arr) {
        let [townName, lat, long] = t.split(/\s*\|\s*/).filter(x => x !== '');
        let townObj = {
            Town: townName,
            Latitude: +lat,
            Longitude: +long
        };
        towns.push(townObj);
    }
    return JSON.stringify(towns);
}

console.log(
    parseTowns([
        '| Town | Latitude | Longitude |',
        '| Sofia | 42.696552 | 23.32601 |',
        '| Beijing | 39.913818 | 116.363625 |'
    ])
);

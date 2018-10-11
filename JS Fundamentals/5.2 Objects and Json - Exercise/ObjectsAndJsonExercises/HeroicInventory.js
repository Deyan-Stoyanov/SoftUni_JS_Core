function parseHeroData(arr) {
    let result = [];
    for (let str of arr) {
        str = str.split(' / ').filter(x => x !== '');
        let obj = {};
        obj['name'] = str[0];
        obj['level'] = +str[1];
        obj['items'] = [];
        if (str.length > 2) {
            obj['items'] = str[2].split(', ').filter(x => x !== '');
        }
        result.push(JSON.stringify(obj));
    }
    return '[' + result.join() + ']';
}

console.log(
    parseHeroData([
        'Isacc / 25 / Apple, GravityGun',
        'Derek / 12 / BarrelVest, DestructionSword',
        'Hes / 1 / Desolator, Sentinel, Antara'
    ])
);

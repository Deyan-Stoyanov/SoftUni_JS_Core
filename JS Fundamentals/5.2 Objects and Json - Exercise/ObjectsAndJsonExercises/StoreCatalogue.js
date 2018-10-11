function storeItems(arr) {
    let obj = {};
    for (let str of arr) {
        let data = str.split(' : ').filter(x => x !== '');
        if (!obj.hasOwnProperty(str.substring(0, 1).toUpperCase())) {
            obj[str.substring(0, 1).toUpperCase()] = {};
        }
        obj[str.substring(0, 1).toUpperCase()][data[0]] = +data[1];
    }
    let letters = Array.from(Object.keys(obj)).sort();
    for (let l of letters) {
        console.log(l);
        let keys = Array.from(Object.keys(obj[l])).sort();
        for (let item of keys) {
            console.log(`   ${item}: ${obj[l][item]}`);
        }
    }
}

storeItems(['Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10'
]);

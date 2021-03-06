function register(arr) {
    let obj = {};
    for (let str of arr) {
        let data = str.split(' | ').filter(x => x !== '');
        let brand = data[0];
        let model = data[1];
        let quantity = +data[2];
        if (!obj.hasOwnProperty(brand)) {
            obj[brand] = {};
        }
        if (!obj[brand].hasOwnProperty(model)) {
            obj[brand][model] = 0;
        }
        obj[brand][model] += quantity;
    }
    let carBrands = Array.from(Object.keys(obj));
    for (let b of carBrands) {
        console.log(b);
        let models = Array.from(Object.keys(obj[b]));
        for (let m of models) {
            console.log(`###${m} -> ${obj[b][m]}`);
        }
    }
}


register(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10'
]);

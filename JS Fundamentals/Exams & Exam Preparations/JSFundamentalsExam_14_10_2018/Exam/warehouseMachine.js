function manageStorage(arr) {
    let storage = {};
    for (let str of arr) {
        str = str.split(', ').filter(x => x !== '');
        let command = str[0];
        let coffeeBrand;
        let coffeeType;
        let date;
        let quantity;
        let allBrands;
        let allTypesOfBrand;
        switch (command.toUpperCase()) {
            case 'IN':
                coffeeBrand = str[1];
                coffeeType = str[2];
                date = str[3];
                quantity = +str[4];
                if (!storage.hasOwnProperty(coffeeBrand)) {
                    storage[coffeeBrand] = {};
                }
                if (!storage[coffeeBrand].hasOwnProperty(coffeeType)) {
                    storage[coffeeBrand][coffeeType] = {};
                    storage[coffeeBrand][coffeeType].date = date;
                    storage[coffeeBrand][coffeeType].quantity = quantity;
                } else {
                    if (storage[coffeeBrand][coffeeType].date === date) {
                        storage[coffeeBrand][coffeeType].quantity += quantity;
                    } else if (storage[coffeeBrand][coffeeType].date.localeCompare(date) != 1) {
                        storage[coffeeBrand][coffeeType].date = date;
                        storage[coffeeBrand][coffeeType].quantity = quantity;
                    }
                }

                break;
            case 'OUT':
                coffeeBrand = str[1];
                coffeeType = str[2];
                date = str[3];
                quantity = +str[4];
                if (storage.hasOwnProperty(coffeeBrand)) {
                    if (storage[coffeeBrand].hasOwnProperty(coffeeType)) {
                        if (storage[coffeeBrand][coffeeType].date.localeCompare(date) === 1 && storage[coffeeBrand][coffeeType].quantity >= quantity) {
                            storage[coffeeBrand][coffeeType].quantity -= quantity;
                        }
                    }
                }
                break;
            case 'REPORT':
                console.log('>>>>> REPORT! <<<<<');
                allBrands = Array.from(Object.keys(storage));
                for (const b of allBrands) {
                    console.log(`Brand: ${b}:`);
                    allTypesOfBrand = Array.from(Object.keys(storage[b]));
                    for (let t of allTypesOfBrand) {
                        console.log(`-> ${t} -> ${storage[b][t].date} -> ${storage[b][t].quantity}.`);
                    }
                }
                break;
            case 'INSPECTION':
                console.log('>>>>> INSPECTION! <<<<<');
                allBrands = Array.from(Object.keys(storage)).sort((a, b) => {
                    return a.localeCompare(b);
                });
                for (const b of allBrands) {
                    console.log(`Brand: ${b}:`);
                    allTypesOfBrand = Array.from(Object.keys(storage[b])).sort((typeA, typeB) => {
                        return storage[b][typeB].quantity - storage[b][typeA].quantity;
                    });
                    for (let t of allTypesOfBrand) {
                        console.log(`-> ${t} -> ${storage[b][t].date} -> ${storage[b][t].quantity}.`);
                    }
                }
                break;
            default:
                break;
        }
    }
}

manageStorage([
    'IN, Batdorf & Bronson, Espresso, 2025-05-25, 20',
    'IN, Folgers, Black Silk, 2023-03-01, 14',
    'IN, Lavazza, Crema e Gusto, 2023-05-01, 5',
    'IN, Lavazza, Crema e Gusto, 2023-05-02, 5',
    'IN, Folgers, Black Silk, 2022-01-01, 10',
    'IN, Lavazza, Intenso, 2022-07-19, 20',
    'OUT, Dallmayr, Espresso, 2022-07-19, 5',
    'OUT, Dallmayr, Crema, 2022-07-19, 5',
    'OUT, Lavazza, Crema e Gusto, 2020-01-28, 2',
    'REPORT',
    'INSPECTION',
]);

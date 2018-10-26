let manager = (function () {
    let stock = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    };
    let products = {
        apple: {
            carbohydrate: 1,
            flavour: 2
        },
        coke: {
            carbohydrate: 10,
            flavour: 20
        },
        burger: {
            carbohydrate: 5,
            fat: 7,
            flavour: 3
        },
        omelet: {
            protein: 5,
            fat: 1,
            flavour: 1
        },
        cheverme: {
            protein: 10,
            carbohydrate: 10,
            fat: 10,
            flavour: 10
        },
    };
    let solution = {
        prepare: function (item, quantity) {
            let product = products[item];
            for (let i = 0; i < quantity; i++) {
                let keys = Array.from(Object.keys(product));
                for (let element of keys) {
                    if (stock[element] < product[element]) {
                        return `Error: not enough ${element} in stock`;
                    }
                }
                for (let element of keys) {
                    stock[element] = stock[element] - product[element];
                }
            }
            return "Success";
        },
        restock: function (item, quantity) {
            stock[item] = stock[item] + +quantity;
            return "Success";
        },
        report: function () {
            return `protein=${stock.protein} carbohydrate=${stock.carbohydrate} fat=${stock.fat} flavour=${stock.flavour}`;
        }
    };

    return function (str) {
        let [command, item, qt] = str.split(/\s+/g).filter(x => x !== "");
        return(solution[command](item, qt));
    };
}());

manager("prepare cheverme 1");
manager("restock protein 10");
manager("prepare cheverme 1");
manager("restock carbohydrate 10");
manager("prepare cheverme 1");
manager("restock fat 10");
manager("prepare cheverme 1");
manager("restock flavour 10");
manager("prepare cheverme 1");
manager("report");

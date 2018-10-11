function caluclateBottles(arr) {
    let obj = {};
    let result = {};
    for (let str of arr) {
        str = str.split(' => ').filter(x => x !== '');
        let juice = str[0];
        let quantity = +str[1];
        if (!obj.hasOwnProperty(juice)) {
            obj[juice] = 0;
        }
        obj[juice] = obj[juice] + quantity;
        if (Math.floor(obj[juice] / 1000) > 0) {
            result[juice] = obj[juice];
        }
    }
    let keys = Array.from(Object.keys(result));
    for (let key of keys) {
            console.log(key + ' => ' + Math.floor(result[key] / 1000));
    }
}

caluclateBottles(['Orange => 2000',
    'Peach => 1432',
    'Banana => 450',
    'Peach => 600',
    'Strawberry => 549'
]);

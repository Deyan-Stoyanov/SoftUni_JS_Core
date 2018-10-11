function printMarketInfo(arr) {
    let townsAndSales = {};
    for (let str of arr) {
        str = str.split(/\s->\s|\s:\s/g).filter(x => x !== '');
        let townName = str[0];
        let product = str[1];
        let sum = +str[2] * +str[3];
        if (!townsAndSales.hasOwnProperty(townName)) {
            townsAndSales[townName] = {};
        }
        townsAndSales[townName][product] = sum;
    }
    let arrOfTowns = Array.from(Object.keys(townsAndSales));
    for (let t of arrOfTowns) {
        console.log(`Town - ${t}`);
        let arrOfProducts = Array.from(Object.keys(townsAndSales[t]));
        for (let p of arrOfProducts) {
            console.log(`$$$${p} : ${townsAndSales[t][p]}`);
        }
    }
}
printMarketInfo(['Sofia -> Laptops HP -> 200 : 2000',
    'Sofia -> Raspberry -> 200000 : 1500',
    'Sofia -> Audi Q7 -> 200 : 100000',
    'Montana -> Portokals -> 200000 : 1',
    'Montana -> Qgodas -> 20000 : 0.2',
    'Montana -> Chereshas -> 1000 : 0.3'
]);

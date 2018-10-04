function aggregate(str) {
    let arr = str.join('').split(/[\s]*\|[\s]*/g).filter(x => x !== '');
    let cities = [];
    let population = 0;
    for (let i = 0; i < arr.length; i += 2) {
        cities.push(arr[i]);
        population += +(arr[i + 1]);
    }
    console.log(cities.join(', '));
    console.log(population);
}

aggregate(['| Sofia           | 300',
    '| Veliko Tarnovo  | 500',
    '| Yambol          | 275'
]);

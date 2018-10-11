function calculateKompots(arr) {
    let cherries = 0;
    let peaches = 0;
    let plums = 0;
    let bucket = 0;
    for (let str of arr) {
        str = str.split(/\s+/g).filter(x => x !== '');
        let fruit = str[0];
        let quantity = +str[1];
        switch (fruit) {
            case 'cherry':
                cherries += quantity / 0.009;
                break;
            case 'peach':
                peaches += quantity / 0.140;
                break;
            case 'plum':
                plums += quantity / 0.020;
                break;
            default:
                bucket += quantity;
                break;
        }
    }
    let cherryKompots = Math.floor(cherries / 25);
    let peachKompots = Math.floor(peaches / 2.5);
    let plumKompots = Math.floor(plums / 10);
    let rakiq = (bucket / 5).toFixed(2);
    console.log(`Cherry kompots: ${cherryKompots}`);
    console.log(`Peach kompots: ${peachKompots}`);
    console.log(`Plum kompots: ${plumKompots}`);
    console.log(`Rakiya liters: ${rakiq}`);
}

calculateKompots(['cherry 1.2',
    'peach 2.2',
    'plum 5.2',
    'peach 0.1',
    'cherry 0.2',
    'cherry 5.0',
    'plum 10',
    'cherry 20.0',
    'papaya 20'
]);

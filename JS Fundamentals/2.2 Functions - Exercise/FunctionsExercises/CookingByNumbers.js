function cook(arr) {
    let number = +arr[0];

    let chop = () => number /= 2;
    let dice = () => number = Math.sqrt(number);
    let spice = () => ++number;
    let bake = () => number *= 3;
    let fillet = () =>  number *= 0.8;

    for (let i = 1; i < arr.length; i++) {
        switch (arr[i]) {
        case 'chop':
            chop();
            break;
        case 'dice':
            dice();
            break;
        case 'spice':
            spice();
            break;
        case 'bake':
            bake();
            break;
        case 'fillet':
            fillet();
            break;
        }
        console.log(number);
    }
}

cook(['9', 'dice', 'spice', 'chop', 'bake', 'fillet']);

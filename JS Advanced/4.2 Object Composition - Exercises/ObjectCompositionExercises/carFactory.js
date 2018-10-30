function manufactureCar(obj) {
    let car = {};
    let engines = {
        Smallengine: {
            power: 90,
            volume: 1800
        },
        Normalengine: {
            power: 120,
            volume: 2400
        },
        Monsterengine: {
            power: 200,
            volume: 3500
        }
    };
    car.model = obj.model;
    let engineKeys = Array.from(Object.keys(engines)).sort((a, b) => a.power - b.power);
    for (let key of engineKeys) {
        if (engines[key].power >= obj.power) {
            car.engine = engines[key];
            break;
        }
    }
    car.carriage = {
        type: obj.carriage,
        color: obj.color
    };
    let wheels = [];
    for (let i = 0; i < 4; i++) {
        wheels.push(Math.floor(obj.wheelsize) % 2 !== 0 ? Math.floor(obj.wheelsize) : Math.floor(obj.wheelsize) - 1);
    }
    car.wheels = wheels;
    return car;
}

console.log(manufactureCar({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
}));

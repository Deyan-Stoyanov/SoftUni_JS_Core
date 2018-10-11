function parseGenome(arr) {
    let animalsAndGenomes = new Map();
    for (let str of arr) {
        if(str === 'Stop!'){
            break;
        }
        let regex = /([!@#$?a-z]+)=([0-9]+)--([0-9]+)<<([a-z]+)/;
        if(!regex.test(str)){
            continue;
        }
        let tokens = regex.exec(str);
        let genomeName = tokens[1];
        let nameLength = +tokens[2];
        let countOfGenes = +tokens[3];
        let animal = tokens[4];
        if(genomeName.split('').filter(x => /[a-zA-Z]/g.test(x) === true).length !== nameLength){
            continue;
        }
        if(!animalsAndGenomes.has(animal)){
            animalsAndGenomes.set(animal, 0);
        }
        animalsAndGenomes.set(animal, animalsAndGenomes.get(animal) + countOfGenes);
    }
    let keys = Array.from(animalsAndGenomes.keys()).sort((a, b) => {
        return animalsAndGenomes.get(b) - animalsAndGenomes.get(a);
    });
    for (let key of keys) {
        console.log(`${key} has genome size of ${animalsAndGenomes.get(key)}`);
    }
}

parseGenome(['!@ab?si?di!a@=7--152<<human',
    'b!etu?la@=6--321<<dog',
    '!curtob@acter##ium$=14--230<<dog',
    '!some@thin@g##=9<<human',
    'Stop!'
]);

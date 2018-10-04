function calculate(str) {
    let regex = /[+-]?[0-9.]+\s*\*\s*[+-]?[0-9.]+/g;
    let matches = str.match(regex);
    for (let m of matches) {
        let data = m.split(/[\s*]+/g).filter(x => x !== '');
        str = str.replace(m, data[0] * data[1]);
    }
    return str;
}

console.log(calculate('My bill: 2*2.50 (beer); 2* 1.20 (kepab); -2  * 0.5 (deposit).'));

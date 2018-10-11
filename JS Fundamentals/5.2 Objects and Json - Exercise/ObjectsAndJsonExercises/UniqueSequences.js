function getuniqueArrays(arr) {
    let result = [];

    function compareArrays(first, second) {
        if (first.length !== second.length) {
            return false;
        }
        for (let i = 0; i < first.length; i++) {
            if (first[i] !== second[i]) {
                return false;
            }
        }
        return true;
    }
    for (let str of arr) {
        str = str.split(/[\s[\],]/g).filter(x => x !== '').map(n => +n).sort((x, y) => {
            return y - x;
        });
        let unique = true;
        for (let array of result) {
            if (compareArrays(array, str) === true) {
                unique = false;
                break;
            }
        }
        if (unique === true) {
            result.push(str);
        }
    }
    result.sort((a, b) => {
        return a.length - b.length;
    }).forEach(x => {
        console.log('[' + x.join(', ') + ']');
    });
}

getuniqueArrays(["[-3, -2, -1, 0, 1, 2, 3, 4]",
    "[10, 1, -17, 0, 2, 13]",
    "[4, -3, 3, -2, 2, -1, 1, 0]"
]);

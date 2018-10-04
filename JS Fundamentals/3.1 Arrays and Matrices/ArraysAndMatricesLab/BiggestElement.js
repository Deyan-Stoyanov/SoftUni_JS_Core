function findBiggestElement(arr) {
    return arr.map((element) => {
            return element.sort((e1, e2) => {
                    return e1 - e2;
                })
                .reverse()
                .shift();
        })
        .sort((el1, el2) => {
            return el1 - el2;
        })
        .reverse()
        .shift();
}
console.log(findBiggestElement([[20, 50, 10], [8, 33, 145]]));

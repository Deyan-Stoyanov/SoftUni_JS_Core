function generateSequence(n, k) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr[i] = arr.length === 0 ? 1 : arr.filter((el, index) => {
                return (index >= i - k && index <= i)
            })
            .reduce((acc, element) => {
                return acc + element
            });
    }
    return arr;
}

console.log(generateSequence(6, 3));

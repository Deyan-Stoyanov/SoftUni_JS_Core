function extractSubsequence(arr) {
    arr.filter((value, index) => {
            return index === 0 || arr[index] >= arr[index - 1];
        })
        .forEach((x) => console.log(x));
}
extractSubsequence([1,
    3,
    8,
    4,
    10,
    12,
    3,
    2,
    24
]);

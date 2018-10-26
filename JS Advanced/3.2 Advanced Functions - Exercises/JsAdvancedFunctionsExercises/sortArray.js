function sortArray(arr, sortingAlgorithm) {
    let ascComparator = function (a, b) {
        return a - b;
    };

    let descComparator = function (a, b) {
        return b - a;
    };

    let sortingAlrorithms = {
        "asc": ascComparator,
        "desc": descComparator
    };

    return arr.sort(sortingAlrorithms[sortingAlgorithm]);
}

console.log("[" + sortArray([14, 7, 17, 6, 8], 'asc').join(", ") + "]");

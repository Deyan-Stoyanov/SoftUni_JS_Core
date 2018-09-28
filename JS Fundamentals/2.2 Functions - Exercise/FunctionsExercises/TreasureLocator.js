function locateTreasure(arr) {
    function checkIfThere(minX, minY, maxX, maxY, x, y) {
        return (x >= minX && x <= maxX && y >= minY && y <= maxY);
    }

    function checkIslands(x, y) {
        if (checkIfThere(1, 1, 3, 3, x, y)) {
            return 'Tuvalu';
        } else if (checkIfThere(8, 0, 9, 1, x, y)) {
            return 'Tokelau';
        } else if (checkIfThere(5, 3, 7, 6, x, y)) {
            return 'Samoa';
        } else if (checkIfThere(0, 6, 2, 8, x, y)) {
            return 'Tonga';
        } else if (checkIfThere(4, 7, 9, 8, x, y)) {
            return 'Cook';
        } else {
            return 'On the bottom of the ocean';
        }
    }

    for (let i = 0; i < arr.length; i += 2) {
        console.log(checkIslands(arr[i], arr[i + 1]));
    }
}
locateTreasure([6, 4]);

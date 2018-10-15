function calculatePollution(matrix, arr) {
    let areas = [];
    let pollutedAreas = [];
    for (let str of matrix) {
        str = str.split(/\s+/g).filter(x => x !== '');
        let tempArr = [];
        for (let n of str) {
            tempArr.push(+n);
        }
        areas.push(tempArr);
    }
    for (let commandArr of arr) {
        let [command, number] = commandArr.split(/\s+/g).filter(x => x !== '');
        number = +number;
        switch (command) {
            case 'breeze':
                for (let i = number; i < number + 1; i++) {
                    for (let j = 0; j < areas[number].length; j++) {
                        areas[i][j] = areas[i][j] - 15 < 0 ? 0 : areas[i][j] - 15;
                    }
                }
                break;
            case 'gale':
                for (let i = 0; i < areas.length; i++) {
                    for (let j = number; j < number + 1; j++) {
                        areas[i][j] = areas[i][j] - 20 < 0 ? 0 : areas[i][j] - 20;
                    }
                }
                break;
            case 'smog':
                for (let i = 0; i < areas.length; i++) {
                    for (let j = 0; j < areas[i].length; j++) {
                        areas[i][j] += number;
                    }
                }
                break;
            default:
                break;
        }
    }
    for (let i = 0; i < areas.length; i++) {
        for (let j = 0; j < areas[i].length; j++) {
            if (areas[i][j] >= 50) {
                pollutedAreas.push(`[${i}-${j}]`);
            }
        }
    }
    return pollutedAreas.length === 0 ? `No polluted areas` : `Polluted areas: ${pollutedAreas.join(', ')}`;
}

console.log(calculatePollution([
        "5 7 2 14 4",
        "21 14 2 5 3",
        "3 16 7 42 12",
        "2 20 8 39 14",
        "7 34 1 10 24",
    ],
    ["breeze 1", "gale 2", "smog 35"]
));

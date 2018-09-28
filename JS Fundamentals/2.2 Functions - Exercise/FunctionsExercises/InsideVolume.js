function printPointInfo(arr){
    function checkPoint(x, y, z){
        let x1 = 10;
        let x2 = 50;
        let y1 = 20;
        let y2 = 80;
        let z1 = 15;
        let z2 = 50;
        return (x >= x1 && x <= x2) && (y >= y1 && y <= y2) && (z >= z1 && z <= z2);
    }
    for (let i = 0; i < arr.length; i += 3) {
        console.log(checkPoint(arr[i], arr[i + 1], arr[i + 2]) ? 'inside' : 'outside');
    }
}
printPointInfo([8, 20, 22]);

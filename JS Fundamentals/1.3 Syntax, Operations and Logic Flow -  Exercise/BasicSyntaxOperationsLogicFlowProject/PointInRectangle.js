function checkPoint([x, y, xMin, xMax, yMin, yMax]){
    return (x >= xMin && x <= xMax && y >= yMin && y <= yMax) ? 'inside' : 'outside';
}

console.log(checkPoint([8, -1, 2, 12, -3, 3]));

function findPath([x1, y1, x2, y2, x3, y3]) {
    function calculateDistance(x1, y1, x2, y2) {
        return Math.sqrt(((x1 - x2) ** 2) + (y1 - y2) ** 2);
    }
    let first = calculateDistance(x1, y1, x2, y2);
    let second = calculateDistance(x2, y2, x3, y3);
    let third = calculateDistance(x1, y1, x3, y3);
    let minPath = Math.min((first + second), (second + third), (first + third));
    if (minPath === first + second) {
        console.log(`1->2->3: ${minPath}`)
    } else if (minPath === first + third) {
        console.log(`2->1->3: ${minPath}`)
    } else if (minPath === second + third) {
        console.log(`1->3->2: ${minPath}`)
    }
}
findPath([5, 1, 1, 1, 5, 4]);

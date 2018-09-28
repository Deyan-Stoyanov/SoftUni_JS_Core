function printValidityData([x1, y1, x2, y2]){
    function checkDistanceValidity(x1, y1, x2, y2){
        function calculateDistance(x1, y1, x2, y2){
            return Math.sqrt(((x1 - x2) ** 2) + (y1 - y2) ** 2);
        }
        return Number.isInteger(calculateDistance(x1, y1, x2, y2)) ? `{${x1}, ${y1}} to {${x2}, ${y2}} is valid` : `{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`;
    }
    console.log(checkDistanceValidity(x1, y1, 0, 0));
    console.log(checkDistanceValidity(x2, y2, 0, 0));
    console.log(checkDistanceValidity(x1, y1, x2, y2));
}

printValidityData([2, 1, 1, 1]);

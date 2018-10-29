function orderRectangles(arr) {
    let result = [];

    function createRectangle(width, height) {
        let rectangle = {
            width,
            height,
            area: () => {
                return rectangle.width * rectangle.height;
            },
            compareTo: (other) =>{
                return other.area() - rectangle.area() || other.width - rectangle.width;
            }
        };
        result.push(rectangle);
    }
    for (let subArr of arr) {
        let [width, height] = subArr;
        createRectangle(width, height);
    }
    result.sort((x, y) => {
        return x.compareTo(y);
    });
    return result;
}

console.log(orderRectangles([
    [10, 5],
    [5, 12]
]));

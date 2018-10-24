function aggregate(arr) {
    console.log("Sum = " + arr.reduce((acc, cur) => {
        return acc += cur;
    }, 0));
    console.log("Min = " + arr.reduce((acc, cur) => {
        return Math.min(acc, cur);
    }));
    console.log("Max = " + arr.reduce((acc, cur) => {
        return Math.max(acc, cur);
    }));
    console.log("Product = " + arr.reduce((acc, cur) => {
        return acc *= cur;
    }, 1));
    console.log("Join = " + arr.reduce((acc, cur) => {
        return acc += ("" + cur);
    }, ""));
}

aggregate([2,3,10,5]);

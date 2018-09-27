function round(arr) {
    let number = +arr[0];
    let precision = +arr[1];
    precision = precision > 15 ? 15 : precision;
    console.log(+number.toFixed(precision));
}
round([3.1415926535897932384626433832795, 2]);

function calculateDistance(arr){
    let x1 = arr[0];
    let y1 = arr[1];
    let z1 = arr[2];
    let x2 = arr[3];
    let y2 = arr[4];
    let z2 = arr[5];
    let distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2) + Math.pow((z1 - z2), 2));
    console.log(distance);
}

calculateDistance([3.5, 0, 1, 0, 2, -1]);

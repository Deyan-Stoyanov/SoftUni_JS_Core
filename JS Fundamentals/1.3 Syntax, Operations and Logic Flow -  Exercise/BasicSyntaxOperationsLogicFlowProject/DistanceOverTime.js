function calculateDistanceDifference(arr){
    let v1 = arr[0] * 1000 / 3600;
    let v2 = arr[1];
    let t = arr[2];
    let firstDistance = v1 * t;
    let secondDistance = v2 * t;
    let diff = Math.abs(firstDistance - secondDistance);
    console.log(diff);
}
calculateDistanceDifference([0, 60, 3600]);

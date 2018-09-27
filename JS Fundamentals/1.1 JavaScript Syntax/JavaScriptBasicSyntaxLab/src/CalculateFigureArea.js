function  calculateArea(w, h, W, H) {
    let firstArea = w * h;
    let secondArea = W * H;
    let areaToSubtract = W * h;
    if (w <= h && H <= W){
        areaToSubtract = w * H;
    }
    let totalArea = firstArea + secondArea - areaToSubtract;
    console.log(totalArea);
}

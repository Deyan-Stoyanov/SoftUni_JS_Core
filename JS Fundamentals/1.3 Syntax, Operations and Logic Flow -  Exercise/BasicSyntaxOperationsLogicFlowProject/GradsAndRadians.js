function gradsToDegrees(grads){
    grads %= 400;
    let degrees = grads * 0.9;
    while(degrees < 0){
        degrees += 360;
    }
    degrees = Math.abs(degrees % 360);
    console.log(degrees);
}
gradsToDegrees(-50);

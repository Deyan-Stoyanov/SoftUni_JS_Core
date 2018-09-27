function printTriangle(n){
    function printRowOfStars(i){
        console.log('*'.repeat(i));
    }
    for (let i = 1; i <= n; i++) {
        printRowOfStars(i);
    }
    for (let i = n - 1; i > 0; i--) {
        printRowOfStars(i);
    }
}


printTriangle(2);

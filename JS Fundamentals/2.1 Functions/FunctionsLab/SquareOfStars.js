function printSquare(n){
    function printRow(i){
        let s = '* '.repeat(i);
        s.trim;
        return s;
    }
    for (let i = 0; i < n; i++) {
        console.log(printRow(n));
    }
}

printSquare(5);

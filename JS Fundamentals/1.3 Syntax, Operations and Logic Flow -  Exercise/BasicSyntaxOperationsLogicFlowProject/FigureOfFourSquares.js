function drawSquare(n){
    if(n % 2 == 0){
        for (let i = 0; i < n - 1; i++) {
            let str = '';
            if(i == 0 || i == n - 2 || i == (n / 2 - 1)){
                for (let j = 0; j < 2; j++) {
                    str += '+';
                    str += '-'.repeat(n - 2);
                }
                str += '+';
            } else {
                for (let j = 0; j < 2; j++) {
                    str += '|';
                    str += ' '.repeat(n - 2);
                }
                str += '|';
            }
            console.log(str);
        }
    } else {
        for (let i = 0; i < n; i++) {
            let str = '';
            if(i == 0 || i == n - 1 || i == Math.floor(n / 2)){
                for (let j = 0; j < 2; j++) {
                    str += '+';
                    str += '-'.repeat(n - 2);
                }
                str += '+';
            } else {
                for (let j = 0; j < 2; j++) {
                    str += '|';
                    str += ' '.repeat(n - 2);
                }
                str += '|';
            }
            console.log(str);
        }
    }
}

drawSquare(25);

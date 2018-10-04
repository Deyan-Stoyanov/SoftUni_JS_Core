function splitExpression(expr){
    return expr.split(/[\s(),;.']/g).filter(x => x != '').join('\n');
}

console.log(splitExpression('let sum = 1 + 2;if(sum > 2){\tconsole.log(sum);}'));

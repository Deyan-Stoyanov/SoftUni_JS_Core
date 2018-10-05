function findVariableNames(str) {
    let regex = /^\_[a-zA-Z0-9]+$/g;
    return str.split(' ').filter(x => regex.test(x) === true).map(x => x.substr(1)).join();
}

console.log(findVariableNames('__invalidVariable _evenMoreInvalidVariable_ _validVariable'));

function splitStr(str, delimiter){
    str.split(delimiter).forEach(x => console.log(x));
}

splitStr('One-Two-Three-Four-Five', '-');

function capitalize(str) {
    let matches = str.match(/[a-zA-Z]+/g);
    for (let m of matches) {
        str = str.replace(m, m.substring(0, 1).toUpperCase() + m.substr(1).toLowerCase());
    }
    return str;
}

console.log(capitalize('Was that Easy? tRY thIs onE for SiZe!'));

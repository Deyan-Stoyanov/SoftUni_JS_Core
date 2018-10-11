function encodeText(arr) {
    let startIndex = +arr[0];
    let endIndex = +arr[1];
    let strToInsert = arr[2];
    let text = arr[3];
    let country = text.match(/[A-Z][a-zA-Z]+[A-Z]/g)[0];
    country = country.substring(0, 1).toUpperCase() + country.substring(1, startIndex).toLowerCase() + strToInsert + country.substring(endIndex + 1).toLowerCase();
    let numbers = text.match(/[0-9]{3}(\.[0-9]+)?/g).map(x => Math.ceil(+x));
    let town = '';
    for (let n of numbers) {
        town += String.fromCharCode(n);
    }
    town = town.substring(0, 1).toUpperCase() + town.substring(1).toLowerCase();
    return `${country} => ${town}`;
}

console.log(encodeText(["3", "5", "gar", "114 sDfia 1, riDl10 confin$4%#ed117 likewise it humanity aTe114.223432 BultoriA - Varnd railLery101 an unpacked as he"]));

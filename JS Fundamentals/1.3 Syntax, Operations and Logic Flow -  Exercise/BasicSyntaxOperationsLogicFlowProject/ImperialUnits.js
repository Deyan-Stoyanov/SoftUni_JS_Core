function convert(oldInches){
    let feet = Math.floor(oldInches / 12);
    let inches = oldInches % 12;
    console.log(`${feet}'-${inches}"`);
}
convert(55);

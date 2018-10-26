function extractArgumentAndArgTypes() {
    let obj = {};
    for (let i = 0; i < arguments.length; i++) {
        let type = typeof arguments[i];
        if (!obj.hasOwnProperty(type)) {
            obj[type] = 0;
        }
        obj[type] = obj[type] + 1;
        console.log(`${type}: ${arguments[i]}`)
    }
    let keys = Array.from(Object.keys(obj)).sort((a,b) => {
        return obj[b] - obj[a];
    });
    for (let key of keys) {
        console.log(`${key} = ${obj[key]}`);
    }
}

extractArgumentAndArgTypes('cat', 42, function () {console.log('Hello world!');});

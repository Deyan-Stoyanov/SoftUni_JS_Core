function generateObjects(arr) {
    let result = {};
    let commands = {
        create: ([name, inherits, father]) => {
            father = father ? result[father] : null;
            let newObj = Object.create(father);
            result[name] = newObj;
            return newObj;
        },
        set: ([name, property, value]) => {
            let obj = result[name];
            obj[property] = value;
        },
        print: ([name]) => {
            let obj = result[name];
            let allProperties = []
            Object.keys(obj).forEach(key => allProperties.push(`${key}:${obj[key]}`));
            while (Object.getPrototypeOf(obj)) {
                Object.keys(Object.getPrototypeOf(obj)).forEach(key => allProperties.push(`${key}:${Object.getPrototypeOf(obj)[key]}`));
                obj = Object.getPrototypeOf(obj);
            }
            console.log(allProperties.join(', '));
        }
    };
    for (let str of arr) {
        str = str.split(/\s+/g).filter(x => x !== "");
        let cmd = str.shift();
        commands[cmd](str);
    }
}

generateObjects(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2'
]);

function listCommands(arr) {
    let list = (function () {
        let arr = [];
        return {
            add: (str) => {
                arr.push(str);
            },
            remove: (str) => {
                arr = arr.filter(x => x !== str);
            },
            print: () => {
                console.log(arr.join());
            }
        };
    }());
    for (let subArr of arr) {
        let [cmd, element] = subArr.split(/\s+/g).filter(x => x !== "");
        list[cmd](element);
    }
}
listCommands(['add hello', 'add again', 'remove hello', 'add again', 'print']);

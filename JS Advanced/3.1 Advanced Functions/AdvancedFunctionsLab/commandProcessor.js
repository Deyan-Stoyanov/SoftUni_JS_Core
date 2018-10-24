function process(arr) {
    let commandProcessor = (function () {
        let text = "";
        return {
            append: (str) => text += str,
            removeStart: (index) => text = text.substring(index),
            removeEnd: (index) => text = text.substring(0, text.length - index),
            print: () => console.log(text)
        };
    }());
    for (let c of arr) {
        let [cmd, arg] = c.split(/\s+/g);
        commandProcessor[cmd](arg);
    }
}

process(['append 123', 'append 45', 'removeStart 2', 'removeEnd 1', 'print']);

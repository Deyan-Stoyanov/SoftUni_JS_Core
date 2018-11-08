let Extensible = (function () {
    let nextId = 0;

    return class Extensible {
        constructor() {
            this.id = nextId++;
        }
        extend(template) {
            let keys = Array.from(Object.keys(template));
            for (let key of keys) {
                if (typeof template[key] == "function") {
                    Object.getPrototypeOf(this)[key] = template[key];
                } else {
                    this[key] = template[key];
                }
            }
        }
    };
})();




let obj1 = new Extensible();
let obj2 = new Extensible();
let obj3 = new Extensible();
console.log(obj1.id);
console.log(obj2.id);
console.log(obj3.id);

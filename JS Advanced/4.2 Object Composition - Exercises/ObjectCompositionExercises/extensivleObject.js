function extendObject() {
    let obj = {
        extend: (template) => {
            let keys = Array.from(Object.keys(template));
            for (let key of keys) {
                if (typeof template[key] == "function") {
                    Object.getPrototypeOf(obj)[key] = template[key];
                } else {
                    obj[key] = template[key];
                }
            }
        }
    };
    return obj;
}

function registerComponents(arr) {
    let systems = new Map();
    for (let str of arr) {
        let data = str.split(' | ').filter(x => x !== '');
        let systemName = data[0];
        let componentName = data[1];
        let subComponentName = data[2];
        if (!systems.has(systemName)) {
            systems.set(systemName, new Map());
        }
        if (!systems.get(systemName).has(componentName)) {
            systems.get(systemName).set(componentName, []);
        }
        systems.get(systemName).get(componentName).push(subComponentName);
    }
    let sortedSystems = Array.from(systems.keys()).sort((a, b) => {
        if (systems.get(b).size === systems.get(a).size) {
            return a.localeCompare(b);
        }
        return systems.get(b).size - systems.get(a).size;
    });
    for (let s of sortedSystems) {
        console.log(s);
        let sortedComponents = Array.from(systems.get(s).keys()).sort((x, y) => {
            return systems.get(s).get(y).length - systems.get(s).get(x).length;
        });
        for (let c of sortedComponents) {
            console.log('|||' + c);
            for (let sc of systems.get(s).get(c)) {
                console.log('||||||' + sc);
            }
        }
    }
}

registerComponents(['SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security'
]);

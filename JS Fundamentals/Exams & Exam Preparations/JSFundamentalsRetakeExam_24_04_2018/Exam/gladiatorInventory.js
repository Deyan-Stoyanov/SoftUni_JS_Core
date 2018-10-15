function manageInventory(arr) {
    let weapons = arr[0].split(/\s+/g).filter(x => x !== '');
    for (let i = 1; i < arr.length; i++) {
        if (weapons[i] === 'Fight!') {
            break;
        }
        let [command, weapon] = arr[i].split(/\s+/g).filter(x => x !== '');
        switch (command) {
            case 'Buy':
                if (!weapons.includes(weapon)) {
                    weapons.push(weapon);
                }
                break;
            case 'Trash':
                weapons = weapons.filter(x => x !== weapon);
                break;
            case 'Repair':
                weapons = weapons.filter(x => x !== weapon);
                weapons.push(weapon);
                break;
            case 'Upgrade':
                let initialWeapon = weapon.split("-")[0];
                if (weapons.includes(initialWeapon)) {
                    weapon = weapon.replace('-', ':');
                    let firstHalf = weapons.slice(0, weapons.indexOf(initialWeapon) + 1);
                    firstHalf.push(weapon);
                    let secondHalf = weapons.slice(weapons.indexOf(initialWeapon) + 1);
                    weapons = firstHalf.concat(secondHalf);
                }
                break;
            default:
                break;
        }
    }
    return weapons.join(' ');
}

console.log(manageInventory(['SWORD Shield Spear',
    'Buy Bag',
    'Trash Shield',
    'Repair Spear',
    'Upgrade SWORD-Steel',
    'Fight!'
]));

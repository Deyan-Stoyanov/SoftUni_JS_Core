function modifyObj(obj) {
    if (obj.handsShaking === true) {
        obj.bloodAlcoholLevel = obj.bloodAlcoholLevel + (0.1 * obj.weight * obj.experience);
        obj.handsShaking = false;
    }
    return obj;
}

console.log(modifyObj({
    weight: 120,
    experience: 20,
    bloodAlcoholLevel: 200,
    handsShaking: true
}));

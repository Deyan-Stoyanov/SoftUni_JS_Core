function filterByAge(minAge, nameA, ageA, nameB, ageB) {
    let person1 = {name:nameA, age:ageA};
    let person2 = {name:nameB, age:ageB};
    let people = [person1, person2];
    for (let i = 0; i < people.length; i++) {
        if (people[i].age >= minAge) {
            console.log(people[i]);
        }
    }
}
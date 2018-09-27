function createObject([property1, value1, property2, value2, property3, value3]){
    let obj = new Object();
    obj[property1] = value1;
    obj[property2] = value2;
    obj[property3] = value3;
    console.log(obj.valueOf());
}

createObject(['name', 'Pesho', 'age', '23', 'gender', 'male']);

function parsePersonInfo(){
    let name = arguments[0];
    let age = +arguments[1];
    let weight = +arguments[2];
    let height = +arguments[3];
    let BMI = Math.round(weight / (Math.pow(height / 100, 2)));
    function getStatus(BMI){
        if(BMI < 18.5){
            return "underweight";
        } else if(BMI < 25){
            return "normal";
        } else if(BMI < 30){
            return "overweight";
        }
        return "obese";
    }

    let person = {};
    person.name = name;
    let personalInfo = {};
    personalInfo.age = age;
    personalInfo.weight = weight;
    personalInfo.height = height;
    person.personalInfo = personalInfo;
    person.BMI = BMI;
    person.status = getStatus(person.BMI);
    if(person.status === "obese"){
        person.recommendation = "admission required";
    }
    return person;
}

console.log(parsePersonInfo("Peter", 29, 75, 182));

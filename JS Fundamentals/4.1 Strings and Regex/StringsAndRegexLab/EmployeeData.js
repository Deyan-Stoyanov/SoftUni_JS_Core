function parseData(arr) {
    for (let str of arr) {
        let empData = str.split(' - ');
        if (empData.length !== 3) {
            continue;
        }
        let employeeName = empData[0];
        let employeeNameRegex = /[A-Z][a-z]+/g;
        let employeeSalary = empData[1];
        let employeeSalaryRegex = /[1-9][0-9]*/g;
        let employeePosition = empData[2];
        let employeePositionRegex = /[A-Za-z0-9 -]/g;
        if (employeeNameRegex.test(employeeName) === true && employeeSalaryRegex.test(employeeSalary) && employeePositionRegex.test(employeePosition)) {
            console.log(`Name: ${employeeName}\nPosition: ${employeePosition}\nSalary: ${employeeSalary}`);
        }
    }
}


parseData(['Isacc - 1000 - CEO',
    'Ivan - 500 - Employee',
    'Peter - 500 - Employee'
]);

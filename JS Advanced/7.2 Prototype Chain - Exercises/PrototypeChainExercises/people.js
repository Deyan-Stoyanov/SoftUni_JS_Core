() => {
    class Employee {
        constructor(name, age) {
            if (new.target === Employee) {
                throw new TypeError("Abstract class, cannot be instantiated.");
            }
            this.name = name;
            this.age = age;
            this.salary = 0;
            this.tasks = [];
        }
        work() {
            let current = this.tasks.shift();
            console.log(current);
            this.tasks.push(current);
        }

        getSalary() {
            return this.salary;
        }

        setSalary(newSalary) {
            this.salary = newSalary;
        }

        collectSalary() {
            console.log(`${this.name} received ${this.getSalary()} this month.`);
        }
    }

    class Junior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks.push(`${name} is working on a simple task.`);
        }
    }

    class Senior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks.push(`${name} is working on a complicated task.`);
            this.tasks.push(`${name} is taking time off work.`);
            this.tasks.push(`${name} is supervising junior workers.`);
        }
    }

    class Manager extends Employee {
        constructor(name, age) {
            super(name, age);
            this.dividend = 0;
            this.tasks.push(`${name} scheduled a meeting.`);
            this.tasks.push(`${name} is preparing a quarterly report.`);
        }
        collectSalary() {
            console.log(`${this.name} received ${this.getSalary() + this.getDividend()} this month.`);
        }
        getDividend(){
            return this.dividend;
        }
        setDividend(newDividend){
            this.dividend = newDividend;
        }
    }
    return{
        Employee,
        Junior,
        Senior,
        Manager
    };
};

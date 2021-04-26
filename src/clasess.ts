// class Department {
//     name: string;
//     constructor(n: string) {
//         this.name = n;
//     }

//     describe(this: Department ) {
//         console.log(`Description of the ${this.name}`);
//     }
// }

// const accouning = new Department("First account");
// console.log(accouning);
// accouning.describe();

// const accountingCopy = {
//     name: "Copy", describe: accouning.describe
// };

// console.log(accountingCopy.describe());

// class Department {
//     name: string;
//     constructor(n: string) {
//         this.name = n;
//     }

//     describe() { console.log(`Description of the ${this.name}`); }
//         

// }

// const accouning = new Department("First account");
// console.log(accouning);
// accouning.describe();

// const accountingCopy = {
//     describe: accouning.describe.bind(accouning) 
// };

// console.log(accountingCopy.describe());

class Department {
      //readonly name: string;
       protected employees: string[] = [];

        constructor(private readonly id: string, public name: string) {
            //this.name = n;
        }
    
        describe() {
            console.log(`Description ${this.name}: ${this.id}`);
            return `Description ${this.name}: ${this.id}`
        }

        addEmpoyee(employee: string) {
            //some validation
            this.employees.push(employee);
        }

        printEmployees() {
            console.log(`There are/is ${this.employees.length} employees`);
            console.log(`There are/is ${this.employees} in our list`)
        }
    }


class itDepartment extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, "IT");
        this.admins = admins;
    }
}

class accountingDepartment extends Department {
    private lastReport: string;
    constructor(id: string, private reports: string[] ) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    get mostResentReport() {
        if(this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found');
    }

    set mostResentReport(value: string) {
        if (!value) {
            throw new Error('Pass in a valid value, plese')
        }
        this.addReport(value);
    }

    addEmpoyee(name: string) {
        if(name === 'Max') {
            return;
        }
        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log('report', this.reports)
    }
}

const accountingFunny = new accountingDepartment('d2', []);
//accountingFunny.addReport('First report');
accountingFunny.addEmpoyee('Olha');
accountingFunny.printEmployees();
accountingFunny.printReports();
console.log('accountingFunny', accountingFunny);
//console.log(accountingFunny.mostResentReport);
accountingFunny.mostResentReport = '';


// const accountingIt = new itDepartment('id', ['Max']);
// console.log('itDepartment', accountingIt);
// accountingIt.addEmpoyee("Nick");
// console.log('itDepartment2', accountingIt);
    
// const accouning = new Department("d1", "First account");
// //console.log(accouning);

// accouning.describe();
// accouning.addEmpoyee("Nick");
// accouning.addEmpoyee("Pol");
// accouning.printEmployees();


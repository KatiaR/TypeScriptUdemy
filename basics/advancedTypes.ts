type Admin = {
    name: string;
    privilages: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const el1: ElevatedEmployee = {
    name: 'Max',
    privilages: ['create-server'],
    startDate: new Date()
}

//interface
interface Admin1 {
    name: string;
    privilages: string[];
}

interface Employee1 {
    name: string;
    startDate: Date;
}

interface ElevatedEmployee1 extends Admin1, Employee1 {};

const el11: ElevatedEmployee = {
    name: 'Max',
    privilages: ['create-server'],
    startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// function addNew(a: Combinable, b: Combinable) {
//     if (typeof a === 'string' || typeof b === 'string') {
//         return a.toString() + b.toString();
//     }
//     return a + b;
// }

type UnknownEmployee = Admin | Employee;

function printEmployeeInformation (emp: UnknownEmployee) {
    console.log(`Name is ${emp.name}`) ;
    if ('privilages' in emp) {
        console.log(`Privilages are ${emp.privilages}`);
    }
    if ('startDate' in emp) {
        console.log(`StartDate is ${emp.startDate}`);
    }
}

printEmployeeInformation(el1);

//const userInputElement = document.getElementById('userInput')! as HTMLInputElement;
//const userInput = <HTMLInputElement>document.getElementById('userInput')!;
//userInputElement.value = 'Dogs';
const userInputElement = document.getElementById('userInput');
if (userInputElement) {
    (userInputElement as HTMLInputElement).value = 'Dogs';
}

interface ErrorContainer {
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email'
}
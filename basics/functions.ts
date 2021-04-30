function add3(n1: number, n2:number): number {
return n1 + n2;
}

function printResult(num: number) {
    console.log(`Hello ${num}`)
}

printResult(add3(5, 4));

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
const result = n1 + n2;
return cb(result);
}

let combinerTypes: (a: number, b: number) => number;
combinerTypes = add3;

console.log(combinerTypes(7,9));

addAndHandle(3,9, (result) => {console.log(result)});

class Car {
    drive() {
        console.log('Driving...')
    }
}

class Truck {
    drive() {
        console.log('Driving a truck...')
    }
    loadCargo(amount: number) {
        console.log(`Loading cargo...${amount}`);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if('loadCargo' in vehicle) { // vehicle instanceof Truck
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
    type: 'bird',
    flyingSpeed: number
}

interface Horse {
    type: 'horse',
    runningSpeed: number
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log(`Moving at speed ${speed}`);
}
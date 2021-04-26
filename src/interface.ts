

interface AddFn {
    (a: number, b: number) : number;
}

let add2 : AddFn;
add2 = (n1: number, n2: number) => {
    return n1 + n2;
}

interface Named {
    readonly name: string;
    outputName? : string;
}

interface Greetable extends Named {
    greet(phrase: string) : void;
}

class Person implements Greetable {
    name: string;
    age = 30;

    constructor(n: string ) {
        this.name = n;
    }
    greet(phrase: string) {
        console.log(`Hello ${phrase} ${this.name}`);
    }

}

let user1: Greetable;
user1 = new Person('Max');
console.log(user1);

// user1 = {
//     name: 'Max',
//     greet(phrase: string) {
//         console.log(`Hello ${phrase} ${this.name}`);
//     }
// }

// user1.greet('I am');
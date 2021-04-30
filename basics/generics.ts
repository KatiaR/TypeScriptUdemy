// const names: Array<string> = [];
// const promise: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Promise was resolved')
//     }, 2000)
// });

function merge<T extends object, U extends object> (objA: T, objB: U) {
    return Object.assign(objA, objB);
}
const mergedObject = merge({name: 'Max'},  {age: 30});
console.log(mergedObject);

interface Lenghty {
    length: number;
}

function countAndDescribe<T extends Lenghty>(elem: T): [T, string] {
    let descriptionText = 'Got no value.';
    if (elem.length === 1) {
        descriptionText = 'Got 1 element';
    } else if (elem.length > 1) {
        descriptionText = `Got ${elem.length} elements`;
    }
    
    return [elem, descriptionText]
}

const description = countAndDescribe([]);
console.log(description);

function extractsAndConver<T extends object, U extends keyof T>(obj : T, key: U) {
    return obj[key]
}
extractsAndConver({name: ''}, 'name');

class DataStorage<T extends number | string | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItem() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Vaw');
textStorage.addItem('Vaw');
textStorage.addItem('Kot');
textStorage.removeItem('Vaw');
console.log(textStorage.getItem());

interface CourceGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourceGoal(title: string, description: string, completeUntil: Date) : CourceGoal {
    let courceGoal: Partial<CourceGoal> = {};
    courceGoal.title = title;
    courceGoal.description = description;
    courceGoal.completeUntil = completeUntil;
    return courceGoal as CourceGoal;
}

const names: Readonly<string[]> = ['Max', 'Peter'];
//names.push('Nema');
console.log(names);

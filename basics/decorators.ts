function Logger(logString: string) {
	console.log('LOGGER');
	return function (constructor: Function) {
		console.log('LOGGER2');
		console.log(logString);
		console.log(constructor);
	};
}

function WithTemplate(template: string, hookId: string) {
	console.log('TEMPLATE');
	return function <T extends { new (...args: any[]): { name: string } }>(
		originalConstructor: T
	) {
		console.log('TEMPLATE2');
		return class extends originalConstructor {
			constructor(..._: any[]) {
				super();
				const hookElem = document.getElementById(hookId);
				if (hookElem) {
					hookElem.innerHTML = template;
					hookElem.querySelector('h1')!.textContent = this.name;
				}
			}
		};
	};
}
@Logger('Logger added here')
@WithTemplate('<h1>My Person object</h1>', 'app')
class Person {
	name = 'Max';

	constructor() {
		console.log('Creating person object...');
	}
}

const pers = new Person();
console.log(pers);

// ----

function Log(target: any, propertyName: string | Symbol) {
	console.log('Property Decorator!');
	console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
	console.log('Accessor decorator');
	console.log(target);
	console.log(name);
	console.log(descriptor);
}

function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
	console.log('Method decorator');
	console.log(target);
	console.log(name);
	console.log(descriptor);
}

function Log4(target: any, name: string, position: number) {
	console.log('Parameter decorator');
	console.log(target);
	console.log(name);
	console.log(position);
}
class Product {
	@Log
	title: string;
	private _price: number;

	@Log2
	set price(val: number) {
		if (val > 0) {
			this._price = val;
		} else {
			throw new Error('Invalid price');
		}
	}
	constructor(t: string, p: number) {
		this.title = t;
		this._price = p;
	}

	@Log3
	getPriceWithTax(@Log4 tax: number) {
		return this._price * (1 + tax);
	}
}

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		enumerable: false,
		get() {
			const boundFn = originalMethod.bind(this);
			return boundFn;
		},
	};
	return adjDescriptor;
}
class Printer {
	message = 'This works';

	@AutoBind
	showMessage() {
		console.log(this.message);
	}
}

const p = new Printer();
const buttonClick = document.querySelector('button')!;
buttonClick.addEventListener('click', p.showMessage);

interface ValidatorConfig {
	[property: string]: {
		[validatableProperty: string]: string[]; // ['required', 'positive']
	};
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],
		[propName]: [
			...registeredValidators[target.constructor.name][propName],
			'required',
		],
	};
}

function PositiveNumber(target: any, propName: string) {
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],
		[propName]: [
			...registeredValidators[target.constructor.name][propName],
			'required',
		],
	};
}

function validate(obj: any) {
	const objValidatorConfig = registeredValidators[obj.constructor.name];
	let isValid = true;
	if (!objValidatorConfig) {
		return true;
	}
	for (const prop in objValidatorConfig) {
		for (const validator of objValidatorConfig[prop]) {
			switch (validator) {
				case 'required':
					isValid = isValid && !!obj[prop];
					break;
				case 'positive':
					isValid = isValid && obj[prop] > 0;
					break;
			}
		}
	}
	return isValid;
}

class Course {
	@Required
	title: string;
	@PositiveNumber
	price: number;

	constructor(t: string, p: number) {
		this.title = t;
		this.price = p;
	}
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('click', (event) => {
	event.preventDefault();
	const titleEl = document.getElementById('title') as HTMLInputElement;
	const priceEl = document.getElementById('price') as HTMLInputElement;
	const title = titleEl.value;
	const price = +priceEl.value;

	const createdCourse = new Course(title, price);
	if (!validate(createdCourse)) {
		throw new Error('Invalidated input, please try again');
		return;
	}
	console.log('createdCourse', createdCourse);
});

import { Component } from './base-component';
import { validate } from '../util/validation';
import { autoBind } from '../decorators/autobind';
import { projectState } from '../state/project-state';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;

	constructor() {
		super('project-input', 'app', true, 'user-input');
		this.titleInputElement = this.element.querySelector(
			'#title'
		) as HTMLInputElement;
		this.descriptionInputElement = this.element.querySelector(
			'#description'
		) as HTMLInputElement;
		this.peopleInputElement = this.element.querySelector(
			'#people'
		) as HTMLInputElement;

		this.configure();
	}

	configure() {
		this.element.addEventListener('submit', this.handleSubmit);
	}

	private gatherUserInput(): [string, string, number] | void {
		const enteredTitle = this.titleInputElement.value;
		const enteredDescription = this.descriptionInputElement.value;
		const enteredPeople = this.peopleInputElement.value;

		const titleValidateble = {
			value: enteredTitle,
			required: true,
		};

		const descriptionValidateble = {
			value: enteredDescription,
			required: true,
			minLength: 5,
		};

		const peopleValidateble = {
			value: enteredPeople,
			required: true,
			min: 1,
			max: 5,
		};

		if (
			!validate(titleValidateble) &&
			!validate(descriptionValidateble) &&
			!validate(peopleValidateble)
		) {
			console.log('Invalid Input, please try again!');
			return;
		} else {
			return [enteredTitle, enteredDescription, +enteredPeople];
		}
	}

	private clearInputs() {
		this.titleInputElement.value = '';
		this.descriptionInputElement.value = '';
		this.peopleInputElement.value = '';
	}

	@autoBind
	private handleSubmit(event: Event) {
		event.preventDefault();
		const userInput = this.gatherUserInput();
		if (Array.isArray(userInput)) {
			const [title, desc, people] = userInput;
			projectState.addProject(title, desc, people);
			console.log(title, desc, people);
			this.clearInputs();
		}
	}

	renderContent() {}
}

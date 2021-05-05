export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
	templateElement: HTMLTemplateElement;
	hostElement: T;
	element: U;

	constructor(
		templateElemId: string,
		hostElemId: string,
		insertAtStart: boolean,
		newElemId?: string
	) {
		this.templateElement = document.getElementById(
			templateElemId
		)! as HTMLTemplateElement;
		this.hostElement = document.getElementById(hostElemId)! as T;

		const importedNode = document.importNode(
			this.templateElement.content,
			true
		);
		this.element = importedNode.firstElementChild as U;
		if (newElemId) {
			this.element.id = newElemId;
		}
		this.attach(insertAtStart);
	}

	private attach(insertAtBeginning: boolean) {
		this.hostElement.insertAdjacentElement(
			insertAtBeginning ? 'afterbegin' : 'beforeend',
			this.element
		);
	}

	abstract configure(): void;
	abstract renderContent(): void;
}

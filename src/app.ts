import { autobind } from './decorators.js';
// import {autobind} from './decorators'

class ProjectInput {
	templateElement: HTMLTemplateElement;
	hostElement: HTMLDivElement;
	element: HTMLFormElement;
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;

	constructor() {
		this.templateElement = <HTMLTemplateElement>(
			document.getElementById('project-input')!
		);
		this.hostElement = <HTMLDivElement>document.getElementById('app');
		const importedNode = document.importNode(
			this.templateElement.content,
			true
		);
		this.element = importedNode.firstElementChild as HTMLFormElement;
		this.element.id = 'user-input';

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
		this.attach();
	}

	@autobind
	private submitHandler(e: Event) {
		e.preventDefault();
		if (this.titleInputElement) {
			console.log(this.titleInputElement.value);
		}
	}

	private configure() {
		this.element.addEventListener('submit', this.submitHandler.bind(this));
	}

	private attach() {
		this.hostElement.insertAdjacentElement('afterbegin', this.element);
	}
}

new ProjectInput();

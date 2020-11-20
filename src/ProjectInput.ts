import { autobind } from './decorators';
import { validate, IValidate } from './validate';
import { projectState } from './ProjectState';
import { Component } from './Component';

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
		this.element.addEventListener('submit', this.submitHandler);
	}

	renderContent() {}

	private gatherUserInput(): [string, string, number] | void {
		const enteredTitle = this.titleInputElement.value;
		const enteredDescription = this.descriptionInputElement.value;
		const enteredPeople = this.peopleInputElement.value;

		const titleValidate: IValidate = {
			value: enteredTitle,
			required: true
		};
		const descriptionValidate: IValidate = {
			value: enteredDescription,
			required: true,
			minLength: 5
		};
		const peopleValidate: IValidate = {
			value: +enteredPeople,
			required: true,
			min: 1,
			max: 5
		};

		if (
			!validate(titleValidate) &&
			!validate(descriptionValidate) &&
			!validate(peopleValidate)
		) {
			alert('Invalid input, please try again');
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

	@autobind
	private submitHandler(e: Event) {
		e.preventDefault();
		const userInput = this.gatherUserInput();
		if (Array.isArray(userInput)) {
			const [title, description, people] = userInput;

			projectState.addProject(title, description, people);
			this.clearInputs();
		}
	}
}

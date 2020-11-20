import { autobind } from './decorators';
import {validate, IValidate} from './validate';
import {ProjectList, ProjectStatus} from './ProjectList';

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

	

	private gatherUserInput(): [string, string, number] | void {
		const enteredTitle = this.titleInputElement.value;
		const enteredDescription = this.descriptionInputElement.value;
		const enteredPeople = this.peopleInputElement.value;

		const titleValidate: IValidate = {
			value: enteredTitle,
			required: true
		}
		const descriptionValidate: IValidate = {
			value: enteredDescription,
			required: true,
			minLength: 5
		}
		const peopleValidate: IValidate = {
			value: +enteredPeople,
			required: true,
			min: 1,
			max:5
		}
		

		if (
			// enteredTitle.trim().length === 0 ||
			// enteredDescription.trim().length === 0 ||
			// enteredPeople.trim().length === 0
			!validate(titleValidate) &&
			!validate(descriptionValidate) &&
			!validate(peopleValidate)
		) {
			alert('Invalid input, please try again')
			return;
		} else {
			return [enteredTitle, enteredDescription, +enteredPeople];
		}
	}

	private clearInput() {
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
			console.log(title, description, people)
			this.clearInput();
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
new ProjectList(ProjectStatus.ACTIVE);
new ProjectList(ProjectStatus.FINISHED);

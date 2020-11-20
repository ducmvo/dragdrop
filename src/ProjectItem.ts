import { Component } from './Component';
import { Project } from './Project';
import { Draggable } from './Drag';
import { autobind } from './decorators';

export class ProjectItem
	extends Component<HTMLUListElement, HTMLLIElement>
	implements Draggable {
	get persons() {
		return this.project.people === 1
			? '1 person'
			: `${this.project.people} persons`;
	}

	constructor(hostId: string, private project: Project) {
        super('single-project', hostId, false, project.id);
        this.configure();
		this.renderContent();
	}

	@autobind
	dragStartHandler(e: DragEvent) {
		e.dataTransfer!.setData('text/plain', this.project.id);
        e.dataTransfer!.effectAllowed = 'move';
	}

	@autobind
	dragEndHandler(_e: DragEvent) {
		console.log(`sucessfully moved ${this.project.title} to ${this.project.status}`);
	}

	configure() {
		this.element.addEventListener('dragstart', this.dragStartHandler.bind(this));
		this.element.addEventListener('dragend', this.dragEndHandler);
	}

	renderContent() {
		this.element.querySelector('h2')!.textContent = this.project.title;
		this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
		this.element.querySelector('p')!.textContent = this.project.description;
	}
}
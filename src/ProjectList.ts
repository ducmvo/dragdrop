import { Project } from './Project';
import { projectState } from './ProjectState';
import { ProjectStatus } from './Project';
import { ProjectItem } from './ProjectItem';
import { Component } from './Component';
import { DragTarget } from './Drag';
import { autobind } from './decorators';

export class ProjectList
	extends Component<HTMLDivElement, HTMLElement>
	implements DragTarget {
	assignedProjects: Project[] = [];

	constructor(private type: ProjectStatus) {
		super('project-list', 'app', false, `${type}-projects`);

		this.configure();
		this.renderContent();
	}

	@autobind
	dragOverHandler(e: DragEvent) {
		if (e.dataTransfer && e.dataTransfer.types[0] === 'text/plain') {
			e.preventDefault();
			const listEl = this.element.querySelector('ul')!;
			listEl.classList.add('droppable');
		}
	}
	@autobind
	dragLeaveHander(e: DragEvent) {
		e.preventDefault();
		const listEl = this.element.querySelector('ul')!;
		listEl.classList.remove('droppable');
		
	}
	@autobind
	dropHandler(e: DragEvent) {
		e.preventDefault();
		const projectId = e.dataTransfer!.getData('text/plain');
		projectState.moveProject(projectId, this.type)
		
		const dragEl = this.element.querySelector('li')
		if(dragEl) {
			dragEl.classList.add('just-moved')
			setTimeout(() =>{
				dragEl.classList.remove('just-moved')
			}, 2000)
		}
		

		const listEl = this.element.querySelector('ul')!;
		listEl.classList.remove('droppable');
	}

	renderContent() {
		const listId = `${this.type}-projects-list`;
		this.element.querySelector('ul')!.id = listId;
		this.element.querySelector('h3')!.textContent =
			this.type.charAt(0).toUpperCase() + this.type.slice(1) + ' Projects';
	}

	configure() {
		this.element.addEventListener('dragover', this.dragOverHandler);
		this.element.addEventListener('dragleave', this.dragLeaveHander);
		this.element.addEventListener('drop', this.dropHandler);

		projectState.addListener((projects: Project[]) => {
			this.assignedProjects = projects.filter(
				(project) => project.status === this.type
			);
			this.renderProjects();
		});
	}

	private renderProjects() {
		const listEl = document.getElementById(
			`${this.type}-projects-list`
		) as HTMLUListElement;
		listEl.innerHTML = '';

		this.assignedProjects.map((project) => {
			new ProjectItem(this.element.querySelector('ul')!.id, project);
		});
	}
}

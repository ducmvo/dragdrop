import { Project } from './Project';
import { projectState } from './ProjectState';
import { ProjectStatus } from './Project';
import { Component } from './Component';

export class ProjectList extends Component<HTMLDivElement, HTMLElement> {
	assignedProjects: Project[] = [];

	constructor(private type: ProjectStatus) {
		super('project-list', 'app', false, `${type}-projects`);

		this.configure();
		this.renderContent();
	}

	renderContent() {
		const listId = `${this.type}-projects-list`;
		this.element.querySelector('ul')!.id = listId;
		this.element.querySelector('h3')!.textContent =
			this.type.charAt(0).toUpperCase() + this.type.slice(1) + ' Projects';
	}

	configure() {
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
			const listItem = document.createElement('li');
			listItem.textContent = project.title;
			listEl.appendChild(listItem);
		});
	}
}

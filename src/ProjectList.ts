export enum ProjectStatus {
	ACTIVE = 'active',
	FINISHED = 'finished'
}

export class ProjectList {
	templateElement: HTMLTemplateElement;
	hostElement: HTMLDivElement;
	element: HTMLElement;

	constructor(private type: ProjectStatus) {
		this.templateElement = document.getElementById(
			'project-list'
		)! as HTMLTemplateElement;
		this.hostElement = document.getElementById('app') as HTMLDivElement;

		const importedNode = document.importNode(
			this.templateElement.content,
			true
		);
		this.element = importedNode.firstElementChild as HTMLElement;

		this.element.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
    }
    
    private renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h3')!.textContent = this.type.charAt(0).toUpperCase() + this.type.slice(1) + ' Projects'
    }

	private attach() {
		this.hostElement.insertAdjacentElement('beforeend', this.element);
	}
}

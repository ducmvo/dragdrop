import {Component} from './Component';
import {Project} from './Project'
export class ProjectItem extends Component<HTMLUListElement,HTMLLIElement> {

    get persons() {
        return this.project.people === 1? '1 person' : `${this.project.people} persons`
    }

    constructor(hostId: string, private project: Project) {
        super('single-project', hostId, false, project.id);
        this.renderContent();
    }

    configure() {}

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}
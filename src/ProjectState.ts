import { Project } from './Project';
import { ProjectStatus } from './Project';

type Listener<T> = (items: T[]) => void;

class State<T> {
	//private: only access within this class
	//protected: can be accessed from inherited classes
	protected listeners: Listener<T>[] = [];

	addListener(listenterFn: Listener<T>) {
		this.listeners.push(listenterFn);
	}
}

export class ProjectState extends State<Project> {
	private projects: Project[] = [];
	private static instance: ProjectState;

	private constructor() {
		super();
	}

	static getInstance() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new ProjectState();
		return this.instance;
	}

	addProject(
		title: string,
		description: string,
		numberOfPeople: number,
		status: ProjectStatus = ProjectStatus.ACTIVE
	) {
		const newProject = new Project(
			Math.random().toString(),
			title,
			description,
			numberOfPeople,
			status
		);

		this.projects.push(newProject);
		for (const listenerFn of this.listeners) {
			listenerFn(this.projects.slice());
		}
	}
}

export const projectState = ProjectState.getInstance();

import {ProjectInput} from './ProjectInput';
import {ProjectStatus} from './Project';
import {ProjectList} from './ProjectList';
import {projectState} from './ProjectState';


new ProjectInput();
const activeProjects = new ProjectList(ProjectStatus.ACTIVE);
const finishedProjects = new ProjectList(ProjectStatus.FINISHED);


projectState.addProject(
	'Maskes Backend - Django',
	'Backend Rest API using python and Django framework ',
	2,
	ProjectStatus.FINISHED
);

projectState.addProject(
	'Maskes Frontend - ReactJS',
	'Front End using React and Redux',
	4,
	ProjectStatus.ACTIVE
); 
activeProjects.renderContent();
finishedProjects.renderContent();
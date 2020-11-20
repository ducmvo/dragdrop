import {ProjectInput} from './ProjectInput';
import {ProjectStatus} from './Project';
import {ProjectList} from './ProjectList';


new ProjectInput();
new ProjectList(ProjectStatus.ACTIVE);
new ProjectList(ProjectStatus.FINISHED);

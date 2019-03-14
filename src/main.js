import {mountFilter} from './modules/filters';
import {Tasks} from './modules/tasks';

mountFilter();

const tasks = new Tasks();
document.querySelector(`.board`).appendChild(tasks.mount());



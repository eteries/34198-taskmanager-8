import {Filters} from './modules/filters';
import {Tasks} from './modules/tasks';

const filters = new Filters();
document.querySelector(`.main__filter`).appendChild(filters.mount());

const tasks = new Tasks();
document.querySelector(`.board`).appendChild(tasks.mount());



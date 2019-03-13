import {mountFilter} from './modules/filters';
import {mountTasks, Task} from './modules/task';
import {INITIAL_TASKS_NUMBER} from './modules/common/constants';
import {getTask} from './data';
import {TaskEdit} from './modules/task-edit';

mountFilter();/*
mountTasks(INITIAL_TASKS_NUMBER);*/

const tasksContainer = document.querySelector(`.board__tasks`);
const taskComponent = new Task(getTask(), 1);
const editTaskComponent = new TaskEdit(getTask(), 1);

tasksContainer.appendChild(taskComponent.mount());

taskComponent.onEdit = () => {
  editTaskComponent.mount();
  tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
  taskComponent.unmount();
};

editTaskComponent.onSubmit = () => {
  taskComponent.mount();
  tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
  editTaskComponent.unmount();
};



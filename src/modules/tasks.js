import {createElement} from './common/utils';
import {Task} from './task';
import {TaskEdit} from './task-edit';
import {getTasks} from '../data';

export class Tasks {
  constructor() {
    this._element = null;

    this._onFilter = () => {
      this._filterTasks();
    }
  }

  mount() {
    if (this._element) {
      this.unmount();
    }

    this._element = createElement(this.template);
    this._appendChildren();
    this._attachEventListeners();
    return this._element;
  }

  unmount() {
    this._detachEventListeners();
    this._element = null;
  }

  _attachEventListeners() {
    document.querySelector(`.main__filter`)
      .addEventListener('filter', this._onFilter);
  }

  _detachEventListeners() {
    this._element.querySelector(`.main__filter`)
      .removeEventListener('filter', this._onFilter);
  }

  _addTask(task, id) {
    const taskComponent = new Task(task, id);
    const editTaskComponent = new TaskEdit(task, id);

    const container = this._element.querySelector(`.board__tasks`);
    container.appendChild(taskComponent.mount());

    taskComponent.onEdit = () => {
      editTaskComponent.mount();
      container.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unmount();
    };

    editTaskComponent.onSubmit = () => {
      taskComponent.mount();
      container.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unmount();
    };
  }

  _appendChildren() {
    getTasks().forEach((item, index) => this._addTask(item, index));
  }

  _filterTasks() {
    const container = this._element.querySelector(`.board__tasks`);
    container.innerHTML = ``;
    this._appendChildren();
  }

  get template() {
    return `<div>
    <p class="board__no-tasks visually-hidden">
          Congratulations, all tasks were completed! To create a new click on
          «add new task» button.
    </p>

    <div class="board__tasks">
    </div>

    <button class="load-more" type="button">load more</button>
    </div>`;
  }
}

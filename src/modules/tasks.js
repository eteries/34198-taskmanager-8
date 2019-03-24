import {Task} from './task';
import {TaskEdit} from './task-edit';
import {getTasks} from '../data';
import {Component} from './common/component';

export class Tasks extends Component {
  constructor() {
    super();

    this._onFilter = () => {
      this._filterTasks();
    };
  }

  createListeners() {
    document.querySelector(`.filter`)
      .addEventListener(`filter`, this._onFilter);
  }

  removeListeners() {
    document.querySelector(`.filter`)
      .removeEventListener(`filter`, this._onFilter);
  }

  _addTask(task, id) {
    const taskComponent = new Task(task, id);
    const editTaskComponent = new TaskEdit(task, id);

    const container = this._element.querySelector(`.board__tasks`);
    container.appendChild(taskComponent.render());

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      container.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = () => {
      taskComponent.render();
      container.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };
  }

  _appendChildren() {
    getTasks().forEach((item, index) => this._addTask(item, index));
  }

  _filterTasks() {
    this.unrender();
    document.querySelector(`.board`).appendChild(this.render());
  }

  get template() {
    return `
    <div>
    <p class="board__no-tasks visually-hidden">
          Congratulations, all tasks were completed! To create a new click on
          «add new task» button.
    </p>

    <div class="board__tasks"></div>

    <button class="load-more" type="button">load more</button>
    </div>
    `;
  }
}

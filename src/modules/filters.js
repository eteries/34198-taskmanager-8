import {createElement, getRandomInteger} from './common/utils';
import {MAX_TASKS_NUMBER} from './common/constants';
import {Filter} from './filter';

const filters = [
  {label: `all`, quantity: getRandomInteger(MAX_TASKS_NUMBER)},
  {label: `overdue`, quantity: 0},
  {label: `today`, quantity: 0},
  {label: `favorites`, quantity: getRandomInteger(MAX_TASKS_NUMBER)},
  {label: `repeating`, quantity: getRandomInteger(MAX_TASKS_NUMBER)},
  {label: `tags`, quantity: getRandomInteger(MAX_TASKS_NUMBER)},
  {label: `archive`, quantity: getRandomInteger(MAX_TASKS_NUMBER)},
];

export class Filters {
  constructor() {
    this._element = null;
  }

  mount() {
    if (this._element) {
      this.unmount();
    }

    this._element = createElement(``);
    this._appendChildren();
    this.attachEventListeners();
    return this._element;
  }

  unmount() {
    this._element = null;
    this.detachEventListeners();
  }

  attachEventListeners() {
    this._element
      .addEventListener(`click`, this.handleFilterClick);
  }

  detachEventListeners() {
    this._element
      .removeEventListener(`click`, this.handleFilterClick);
  }

  handleFilterClick(event) {
    if (!event.target ||
      event.target.tagName !== `LABEL` ||
      event.target.control.disabled ||
      event.target.control.checked) {
      return;
    }

    this._element.dispatchEvent(new Event(`filter`));
  }

  _appendChildren() {
    filters.forEach((filter, index) => this._addFilter(filter.label, filter.quantity, index));
  }

  _addFilter(label, quantity, index) {
    const filterComponent = new Filter(label, quantity, index);
    this._element.appendChild(filterComponent.mount());
  }
}

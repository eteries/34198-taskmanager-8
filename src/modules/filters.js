import {getRandomInteger} from './common/utils';
import {MAX_TASKS_NUMBER} from '../data';
import {Filter} from './filter';
import {Component} from './common/component';

const filters = [
  {label: `all`, quantity: getRandomInteger(MAX_TASKS_NUMBER)},
  {label: `overdue`, quantity: 0},
  {label: `today`, quantity: 0},
  {label: `favorites`, quantity: getRandomInteger(MAX_TASKS_NUMBER)},
  {label: `repeating`, quantity: getRandomInteger(MAX_TASKS_NUMBER)},
  {label: `tags`, quantity: getRandomInteger(MAX_TASKS_NUMBER)},
  {label: `archive`, quantity: getRandomInteger(MAX_TASKS_NUMBER)},
];

export class Filters extends Component {
  constructor() {
    super();

    this._onClick = (event) => {
      this._handleOnClick(event);
    };
  }

  createListeners() {
    this._element
      .addEventListener(`click`, this._onClick);
  }

  removeListeners() {
    this._element
      .removeEventListener(`click`, this._onClick);
  }

  _handleOnClick(event) {
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
    this._element.appendChild(filterComponent.render());
  }

  get template() {
    return `
    <div class="filter">
      ${filters.map((filter, index) => `
        <input type="radio"
           id="filter__${filter.label}"
           class="filter__input visually-hidden"
           name="filter"
           ${index === 0 ? `checked` : ``}
           ${filter.quantity === 0 ? `disabled` : ``}
        />
        <label for="filter__${filter.label}" 
               class="filter__label">
             ${filter.label} 
            <span class="filter__${filter.label}-count">${filter.quantity}</span>
        </label>
      `).join(``)}
    </div>`;
  }
}

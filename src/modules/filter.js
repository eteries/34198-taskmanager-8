import {Component} from './common/component';

export class Filter extends Component {
  constructor(label, quantity, index) {
    super();

    this._label = label;
    this._quantity = quantity;
    this._index = index;
  }

  get template() {
    return `
      <input type="radio"
           id="filter__${this._label}"
           class="filter__input visually-hidden"
           name="filter"
           ${this._index === 0 ? `checked` : ``}
           ${this._quantity === 0 ? `disabled` : ``}
    />
    <label for="filter__${this._label}" 
           class="filter__label">
         ${this._label} 
        <span class="filter__${this._label}-count">${this._quantity}</span>
    </label>
    `;
  }
}

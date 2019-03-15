import {createFragment} from './common/utils';

export class Filter {
  constructor(label, quantity, index) {
    this._label = label;
    this._quantity = quantity;
    this._index = index;

    this._element = null;
  }

  mount() {
    if (this._element) {
      this.unmount();
    }

    this._element = createFragment(this.template);
    return this._element;
  }

  unmount() {
    this._element = null;
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

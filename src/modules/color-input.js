import {createElement} from './common/utils';

export class ColorInput {
  constructor(colorName, id) {
    this._colorName = colorName;
    this._id = id;
    this._element = null;
  }

  mount() {
    if (this._element) {
      this.unmount();
    }

    this._element = createElement(this.template);
    return this._element;
  }

  unmount() {
    this._element = null;
  }

  get template() {
    return `
    <div>
    <input
      type="radio"
      id="color-${this._colorName}-${this._id}"
      class="card__color-input card__color-input--${this._colorName} visually-hidden"
      name="color"
      value="${this._colorName}"
    />
    <label
      for="color-${this._colorName}-${this._id}"
      class="card__color card__color--${this._colorName}"
      >${this._colorName}</label
</div>
    `
  }
}

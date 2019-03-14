import {createElement} from './common/utils';

export class DayInput {
  constructor(dayName, id) {
    this._dayName = dayName;
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
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${this._dayName.label}-${this._id}"
      name="repeat"
      value="${this._dayName.label}"
      ${this._dayName.checked ? `checked` : ``}
    />
    <label class="card__repeat-day" for="repeat-${this._dayName.label}-${this._id}"
      >${this._dayName.label}</label
    >
</div>
    `
  }
}

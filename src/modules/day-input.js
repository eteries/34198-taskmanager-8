import {Component} from './common/component';

export class DayInput extends Component {
  constructor(dayName, id) {
    super();

    this._dayName = dayName;
    this._id = id;
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
    `;
  }
}

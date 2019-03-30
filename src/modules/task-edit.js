import {colors} from '../data';
import {Tag} from './tag';
import {ColorInput} from './color-input';
import {DayInput} from './day-input';
import {Component} from './common/component';

import flatpickr from "flatpickr";
import moment from "moment";

export class TaskEdit extends Component {
  constructor(task, id) {
    super();

    this._title = task.title;
    this._dueDate = task.date;
    this._tags = task.tags;
    this._picture = task.picture;
    this._repeatingDays = task.repeatingDays;

    this._id = id;
    this._color = task.color;

    this._state = {};
    this._state.isDate = !!task.dueDate;
    this._state.isRepeated = false;

    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);

    this._onSubmit = null;

    this._onSubmitButtonClick = (event) => {
      event.preventDefault();

      const formData = new FormData(this._element.querySelector(`.card__form`));
      const newData = this._processForm(formData);

      if (typeof this._onSubmit === `function`) {
        this._onSubmit(newData);
      }

      this.update(newData);
    };
  }

  get _isDeadline() {
    return this._dueDate > Date.now();
  }

  get _haveRepeatingDays() {
    return this._repeatingDays.some((day) => day.checked);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  createListeners() {
    this._element.querySelector(`.card__save`)
                 .addEventListener(`click`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
                 .addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
                 .addEventListener(`click`, this._onChangeRepeated);

    if (this._state.isDate) {
      flatpickr(
          this._element.querySelector(`.card__date`),
          {altInput: true, altFormat: `j F`, dateFormat: `j F`, defaultDate: this._dueDate || new Date()}
      );
      flatpickr(
          this._element.querySelector(`.card__time`),
          {enableTime: true, noCalendar: true, altInput: true, altFormat: `H:i`, dateFormat: `H:i`, defaultDate: this._dueDate || new Date()}
      );
    }
  }

  removeListeners() {
    this._element.querySelector(`.card__save`)
                 .removeEventListener(`click`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
                 .removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
                 .removeEventListener(`click`, this._onChangeRepeated);
  }

  _appendChildren() {
    this._tags.forEach((tag) => this._addTag(tag));
    colors.forEach((color) => this._addColor(color, this._id));
    this._repeatingDays.forEach((day) => this._addDay(day, this._id));
  }

  _addTag(tag) {
    const tagComponent = new Tag(tag);
    const container = this._element.querySelector(`.card__hashtag-list`);
    container.appendChild(tagComponent.render());
  }

  _addColor(color, id) {
    const colorInputComponent = new ColorInput(color, id);
    const container = this._element.querySelector(`.card__colors-wrap`);
    container.appendChild(colorInputComponent.render());
  }

  _addDay(day, id) {
    const dayInputComponent = new DayInput(day, id);
    const container = this._element.querySelector(`.card__repeat-days-inner`);
    container.appendChild(dayInputComponent.render());
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.removeListeners();
    this._partialUpdate();
    this.createListeners();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.removeListeners();
    this._partialUpdate();
    this.createListeners();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
    this._appendChildren();
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: `blue`,
      tags: [],
      dueDate: new Date(),
      repeatingDays: [
        {label: `md`, checked: false},
        {label: `tu`, checked: false},
        {label: `we`, checked: false},
        {label: `th`, checked: false},
        {label: `fr`, checked: false},
        {label: `sa`, checked: false},
        {label: `su`, checked: false}
      ]
    };

    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  update(data) {
    this._title = data.title;
    this._color = data.color;
    this._tags = data.tags;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
  }

  static createMapper(target) {
    return {
      hashtag: (value) => value.trim() && target.tags.push(value),
      text: (value) => {
        target.title = value;
      },
      color: (value) => {
        target.color = value;
      },
      repeat: (value) => {
        target.repeatingDays.find((day) => day.label === value).checked = true;
      },
      date: (value) => {
        target.dueDate = value;
      },
      time: (value) => {
        const newDate = moment(target.dueDate, `DD MMMM`);
        newDate.set(`hours`, (moment(value, `h:mm`).hours()));
        newDate.set(`minutes`, (moment(value, `h:mm`).minutes()));
        target.dueDate = newDate.valueOf();
      }
    };
  }

  get template() {
    return `
<article class="card card--edit card--${this._color} ${this._isDeadline ? `card--deadline` : ``}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive">
            archive
          </button>
          <button type="button" class="card__btn card__btn--favorites card__btn--disabled">
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg ${this._color === `blue` ? `` : `class="card__color-bar-wave"`} width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >${this._title}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__date-deadline" ${this._state.isDate ? `` : `disabled`}>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder="${moment(this._dueDate).format(`DD MMMM`)}"
                    name="date"
                    value="${this._dueDate}"
                  />
                </label>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__time"
                    type="text"
                    placeholder="11:15 PM"
                    name="time"
                    value="${this._dueDate}"
                  />
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__repeat-days" ${this._state.isRepeated ? `` : `disabled`}>
                    <div class="card__repeat-days-inner"></div>
                </fieldset>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list"></div>

                  <label>
                    <input
                      type="text"
                      class="card__hashtag-input"
                      name="hashtag"
                      placeholder="Type new hashtag here"
                    />
                  </label>
                </div>
              </div>
              
              <label class="card__img-wrap">
                    <input
                      type="file"
                      class="card__img-input visually-hidden"
                      name="img"
                    />
                    <img
                      src="${this._picture}"
                      alt="task picture"
                      class="card__img"
                    />
              </label>
              <label class="card__img-wrap card__img-wrap--empty" hidden>
                <input
                  type="file"
                  class="card__img-input visually-hidden"
                  name="img"
                />
                <img
                  src="img/add-photo.svg"
                  alt="task picture"
                  class="card__img"
                />
              </label>            

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap"></div>
              </div>
            </div>

            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>
    `;
  }
}

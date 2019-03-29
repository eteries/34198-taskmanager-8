import {Tag} from './tag';
import {Component} from './common/component';

import moment from 'moment';

export class Task extends Component {
  constructor(task) {
    super();

    this._title = task.title;
    this._dueDate = task.date;
    this._tags = task.tags;
    this._picture = task.picture;
    this._repeatingDays = task.repeatingDays;
    this._color = task.color;

    this._onEdit = null;

    this._onEditButtonClick = (event) => {
      event.preventDefault();
      if (typeof this._onEdit === `function`) {
        this._onEdit();
      }
    };
  }

  get _isDeadline() {
    return this._dueDate > Date.now();
  }

  get _haveRepeatingDays() {
    return this._repeatingDays.some((day) => day.checked);
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  createListeners() {
    this._element.querySelector(`.card__btn--edit`)
                 .addEventListener(`click`, this._onEditButtonClick);
  }

  removeListeners() {
    this._element.querySelector(`.card__btn--edit`)
                 .removeEventListener(`click`, this._onEditButtonClick);
  }

  _appendChildren() {
    this._tags.forEach((tag) => this._addTag(tag));
  }

  _addTag(tag) {
    const tagComponent = new Tag(tag);
    const container = this._element.querySelector(`.card__hashtag-list`);
    container.appendChild(tagComponent.render());
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
  }

  get template() {
    return `
<article class="card card--${this._color} ${this._isDeadline ? `card--deadline` : ``}">
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
          <svg ${this._haveRepeatingDays ? `` : `class="card__color-bar-wave"`} width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
            <div
              class="card__text"
            >${this._title}</div>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <span class="card__date-status">
                ${moment(this._dueDate).format(`DD MMMM HH:MM`)}
              </span>
            </div>            
            <div class="card__hashtag">
              <div class="card__hashtag-list" ></div>

              <label>
                <input
                  type="text"
                  class="card__hashtag-input"
                  name="hashtag-input"
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

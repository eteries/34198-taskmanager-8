import {formatDate} from './common/utils';
import {Tag} from './tag';
import {Component} from './common/component';

export class Task extends Component {
  constructor(task) {
    super();

    this._title = task.title;
    this._dueDate = task.date;
    this._tags = task.tags;
    this._picture = task.picture;
    this._repeatingDays = task.repeatingDays;

    this._color = `blue`;

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
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
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
              date: <span class="card__date-status">${this._isDeadline ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__date-deadline" ${this._isDeadline ? `` : `disabled`}>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__date"
                  type="text"
                  placeholder="${formatDate(this._dueDate)}"
                  name="date"
                  value="${formatDate(this._dueDate)}"
                />
              </label>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__time"
                  type="text"
                  placeholder="11:15 PM"
                  name="time"
                  value="11:15 PM"
                />
              </label>
              </fieldset>
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

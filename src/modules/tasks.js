import {getTask} from '../data';
import {composeStringFromData, prepareDateString} from './common/utils';

const isEdit = false;

const prepareOneTaskString = (id, task) => {
  return `
<article class="card card--${task.color}"
                ${isEdit ? `card--edit` : ``}
                ${task.isDeadline ? `card--deadline` : ``}>
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
          <svg ${task.color === `blue` ? `` : `class="card__color-bar-wave"`} width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >${task.title}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${task.isDeadline ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__date-deadline" ${task.isDeadline ? `` : `disabled`}>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder="${prepareDateString(task.date)}"
                    name="date"
                    value="${prepareDateString(task.date)}"
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

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">no</span>
                </button>

                <fieldset class="card__repeat-days" disabled >
                    <div class="card__repeat-days-inner">
                      ${composeStringFromData(task.repeatingDays, prepareDayString)}
                    </div>
                  </fieldset>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list" >
                    ${composeStringFromData(task.tags, prepareTagString)}
                  </div>

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
                      src="${task.picture}"
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
                <div class="card__colors-wrap">
                  <input
                    type="radio"
                    id="color-black-${id}"
                    class="card__color-input card__color-input--black visually-hidden"
                    name="color"
                    value="black"
                  />
                  <label
                    for="color-black-${id}"
                    class="card__color card__color--black"
                    >black</label
                  >
                  <input
                    type="radio"
                    id="color-yellow-${id}"
                    class="card__color-input card__color-input--yellow visually-hidden"
                    name="color"
                    value="yellow"
                  />
                  <label
                    for="color-yellow-${id}"
                    class="card__color card__color--yellow"
                    >yellow</label
                  >
                  <input
                    type="radio"
                    id="color-blue-${id}"
                    class="card__color-input card__color-input--blue visually-hidden"
                    name="color"
                    value="blue"
                  />
                  <label
                    for="color-blue-${id}"
                    class="card__color card__color--blue"
                    >blue</label
                  >
                  <input
                    type="radio"
                    id="color-green-${id}"
                    class="card__color-input card__color-input--green visually-hidden"
                    name="color"
                    value="green"
                  />
                  <label
                    for="color-green-${id}"
                    class="card__color card__color--green"
                    >green</label
                  >
                  <input
                    type="radio"
                    id="color-pink-${id}"
                    class="card__color-input card__color-input--pink visually-hidden"
                    name="color"
                    value="pink"
                    checked
                  />
                  <label
                    for="color-pink-${id}"
                    class="card__color card__color--pink"
                    >pink</label
                  >
                </div>
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
};

const prepareTagString = (name) => `
    <span class="card__hashtag-inner">
      <input
        type="hidden"
        name="hashtag"
        value="repeat"
        class="card__hashtag-hidden-input"
      />
      <button type="button" class="card__hashtag-name">
        #${name}
      </button>
      <button type="button" class="card__hashtag-delete">
        delete
      </button>
    </span>
`;

const prepareDayString = (day, id) => `
    <input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${day.name}-${id}"
      name="repeat"
      value="${day.name}"
      ${day.checked ? `checked` : ``}
    />
    <label class="card__repeat-day" for="repeat-${day.name}-${id}"
      >${day.name}</label
    >
`;

export const mountTasks = (quantity) => {
  const cards = [];
  const cardsQuantity = Number.isInteger(quantity) ? quantity : 0;

  for (let i = 0; i < cardsQuantity; i++) {
    cards.push(prepareOneTaskString(i, getTask()));
  }

  const cardsString = cards.reduce((resultingString, oneCardString) => resultingString + oneCardString, ``);

  const cardsElement = document.querySelector(`.board__tasks`);
  cardsElement.innerHTML = ``;
  cardsElement.insertAdjacentHTML(`beforeEnd`, cardsString);
};

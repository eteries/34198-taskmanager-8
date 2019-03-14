import {getRandomInteger} from './common/utils';
import {MAX_TASKS_NUMBER} from './common/constants';

const filters = [
  {label: `all`, quantity: getRandomInteger(MAX_TASKS_NUMBER)},
  {label: `overdue`, quantity: 0},
  {label: `today`, quantity: 0},
  {label: `favorites`, quantity: getRandomInteger(MAX_TASKS_NUMBER)},
  {label: `repeating`, quantity: getRandomInteger(MAX_TASKS_NUMBER)},
  {label: `tags`, quantity: getRandomInteger(MAX_TASKS_NUMBER)},
  {label: `archive`, quantity: getRandomInteger(MAX_TASKS_NUMBER)},
];

const filtersElement = document.querySelector(`.main__filter`);

const prepareOneFilterString = (label, quantity, index) =>
  `
  <input type="radio"
         id="filter__${label}"
         class="filter__input visually-hidden"
         name="filter"
         ${index === 0 ? `checked` : ``}
         ${quantity === 0 ? `disabled` : ``}
  />
  <label for="filter__${label}" 
         class="filter__label">
       ${label} 
      <span class="filter__${label}-count">${quantity}</span>
  </label>
`;

const filtersString = filters
  .map((filter, index) => prepareOneFilterString(filter.label, filter.quantity, index))
  .reduce((resultingString, oneFilterString) => resultingString + oneFilterString);

export const mountFilter = () => {
  filtersElement.innerHTML = ``;
  filtersElement.insertAdjacentHTML(`beforeEnd`, filtersString);

  filtersElement.addEventListener(`click`, (event) => {
    if (!event.target ||
         event.target.tagName !== `LABEL` ||
         event.target.control.disabled ||
         event.target.control.checked) {
      return;
    }

    filtersElement.dispatchEvent(new Event('filter'));
  });
};



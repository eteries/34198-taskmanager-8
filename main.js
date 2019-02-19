const filters = [
  {label: `all`, checked: true},
  {label: `overdue`, disabled: true},
  {label: `today`, disabled: true},
  {label: `favorites`},
  {label: `repeating`},
  {label: `tags`},
  {label: `archive`},
];

const getRandomNumber = () => Math.floor(Math.random() * 100);

const prepareOneFilterString = (label, checked = false, disabled = false) =>
  `
  <input type="radio"
         id="filter__${label}"
         class="filter__input visually-hidden"
         name="filter"
         ${checked ? `checked` : ``}
         ${disabled ? `disabled` : ``}
  />
  <label for="filter__${label}" 
         class="filter__label">
       ${label} 
      <span class="filter__${label}-count">${getRandomNumber()}</span>
  </label>
`;

const filtersString = filters
  .map((filter) => prepareOneFilterString(filter.label, filter.checked, filter.disabled))
  .reduce((resultingString, oneFilterString) => resultingString + oneFilterString);

document.querySelector(`.main__filter`)
        .insertAdjacentHTML('beforeEnd', filtersString);

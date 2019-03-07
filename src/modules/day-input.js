export const prepareDayInputString = (day, id) => `
    <input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${day.label}-${id}"
      name="repeat"
      value="${day.label}"
      ${day.checked ? `checked` : ``}
    />
    <label class="card__repeat-day" for="repeat-${day.label}-${id}"
      >${day.label}</label
    >
`;

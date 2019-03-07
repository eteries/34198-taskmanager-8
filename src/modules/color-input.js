export const prepareColorString = (colorName, id) => `
    <input
      type="radio"
      id="color-${colorName}-${id}"
      class="card__color-input card__color-input--${colorName} visually-hidden"
      name="color"
      value="${colorName}"
    />
    <label
      for="color-${colorName}-${id}"
      class="card__color card__color--${colorName}"
      >${colorName}</label
    >
`;

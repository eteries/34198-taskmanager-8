export const getRandomInteger = (max) => Math.floor(Math.random() * max);

export const formatDate = (date) => {
  const day = new Date(date).getDate();
  const monthNum = new Date(date).getMonth();
  let month;

  switch (monthNum) {
    case 0:
      month = `January`;
      break;
    case 1:
      month = `February`;
      break;
    case 2:
      month = `March`;
      break;
    case 3:
      month = `April`;
      break;
    case 4:
      month = `May`;
      break;
    case 5:
      month = `June`;
      break;
    case 6:
      month = `July`;
      break;
    case 7:
      month = `August`;
      break;
    case 8:
      month = `September`;
      break;
    case 9:
      month = `October`;
      break;
    case 10:
      month = `November`;
      break;
    case 11:
      month = `December`;
      break;
  }

  return `${day} ${month}`;
};

export const joinElements = (cb, data, cardId) => {
  return [...data]
    .map((item) => cb(item, cardId))
    .join(``);
};

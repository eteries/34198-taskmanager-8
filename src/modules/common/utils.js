export const getRandomInteger = (max) => Math.floor(Math.random() * max);

export const formatDate = (date) => {
  const day = new Date(date).getDate();
  const monthNum = new Date(date).getMonth();
  const months = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`
  ];

  return `${day} ${months[monthNum]}`;
};

export const joinElements = (cb, data, cardId) => {
  return [...data]
    .map((item) => cb(item, cardId))
    .join(``);
};

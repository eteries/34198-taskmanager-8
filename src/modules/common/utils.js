export const getRandomInteger = (max) => Math.floor(Math.random() * max);

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

export const formatDate = (date) => {
  const day = new Date(date).getDate();
  const monthNum = new Date(date).getMonth();

  return `${day} ${months[monthNum]}`;
};

export const createElement = (templateString) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = templateString.trim();
  return newElement.firstChild;
};

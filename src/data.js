const taskTitles = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const colors = new Set([`black`, `yellow`, `blue`, `green`, `pink`]);

const tags = new Set([`homework`, `theory`, `practice`, `intensive`, `keks`, `doNotForget`]);

const days = new Set(
    [
      {name: `md`, checked: true},
      {name: `tu`, checked: false},
      {name: `we`, checked: true},
      {name: `th`, checked: false},
      {name: `fr`, checked: false},
      {name: `sa`, checked: true},
      {name: `su`, checked: false},
    ]
);

const getRandomRecentDate = () => {
  const WEEK = 7 * 24 * 60 * 60 * 1000;
  return Date.now() - WEEK + Math.floor(Math.random() * 2 * WEEK);
};

export const getTask = () => ({
  title: taskTitles[Math.floor(Math.random() * 3)],
  date: getRandomRecentDate(),
  tags: [...tags][Math.floor(Math.random() * (Math.ceil(Math.random() * 3)))],
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: [...colors][Math.floor(Math.random() * colors.size)],
  isRepeating: true,
  repeatingDays: days,
  isFavorite: true,
  isDone: true,
  isDeadline: true
});

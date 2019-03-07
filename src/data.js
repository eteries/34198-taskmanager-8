const taskTitles = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

export const colors = new Set([`black`, `yellow`, `blue`, `green`, `pink`]);

const tags = new Set([`homework`, `theory`, `practice`, `intensive`, `keks`, `doNotForget`]);

const days = new Set(
    [
      {label: `md`, checked: true},
      {label: `tu`, checked: false},
      {label: `we`, checked: true},
      {label: `th`, checked: false},
      {label: `fr`, checked: false},
      {label: `sa`, checked: true},
      {label: `su`, checked: false},
    ]
);

const getRandomRecentDate = () => {
  const WEEK = 7 * 24 * 60 * 60 * 1000;
  return Date.now() - WEEK + Math.floor(Math.random() * 2 * WEEK);
};

export const getTask = () => ({
  title: taskTitles[Math.floor(Math.random() * 3)],
  date: getRandomRecentDate(),
  tags: [...tags].splice(0, Math.ceil(Math.random() * 3)),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: [...colors][Math.floor(Math.random() * colors.size)],
  isRepeating: true,
  repeatingDays: days,
  isFavorite: true,
  isDone: true,
  isDeadline: true
});

const taskTitles = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const randomRecentDate = Date.now - 7 * 24 * 60 * 60 * 1000 + Math.floor(Math.random * 7 * 24 * 60 * 60 * 1000);

const task = {
  title: taskTitles[Math.floor(Math.random() * 3)],
  date: randomRecentDate,
  tags: new Set([`homework`, `theory`, `practice`, `intensive`, `keks`, `doNotForget`]),
  picture: `//picsum.photos/100/100?r=${Math.random()}`,
  colors: new Set([`black`, `yellow`, `blue`, `green`, `pink`]),
  isRepeating: true,
  repeatingDays: {
    'mo': true,
    'tu': false,
    'we': true,
    'th': false,
    'fr': false,
    'sa': true,
    'su': false,
  },
  isFavorite: true,
  isDone: true,
  isEdit: false,
  isDeadline: true
};

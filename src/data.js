import {getRandomInteger} from './modules/common/utils';

const taskTitles = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const MAX_TAGS_NUM = 3;
const MIN_TASKS_NUM = 1;
export const MAX_TASKS_NUMBER = 100;
export const INITIAL_TASKS_NUMBER = 7;

export const colors = [`black`, `yellow`, `blue`, `green`, `pink`];

const tags = [`homework`, `theory`, `practice`, `intensive`, `keks`, `doNotForget`];

const days = [
  {label: `md`, checked: false},
  {label: `tu`, checked: false},
  {label: `we`, checked: false},
  {label: `th`, checked: false},
  {label: `fr`, checked: false},
  {label: `sa`, checked: false},
  {label: `su`, checked: false},
];

export const getTask = () => ({
  title: taskTitles[Math.floor(Math.random() * taskTitles.length)],
  date: null,
  tags: tags.splice(0, Math.ceil(Math.random() * MAX_TAGS_NUM)),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: colors[Math.floor(Math.random() * colors.length)],
  isRepeating: true,
  repeatingDays: days,
  isFavorite: true,
  isDone: true,
  isDeadline: true
});

export const getTasks = () => {
  return new Array(getRandomInteger(INITIAL_TASKS_NUMBER) + MIN_TASKS_NUM).fill(``).map(() => getTask());
};

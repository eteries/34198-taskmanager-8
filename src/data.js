import {getRandomInteger} from './modules/common/utils';
import {INITIAL_TASKS_NUMBER} from './modules/common/constants';

const taskTitles = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const MAX_TAGS_NUM = 3;
const MIN_TASKS_NUM = 1;
const RECENT_WEEKS_NUM = 2;

export const colors = [`black`, `yellow`, `blue`, `green`, `pink`];

const tags = [`homework`, `theory`, `practice`, `intensive`, `keks`, `doNotForget`];

const days = [
  {label: `md`, checked: true},
  {label: `tu`, checked: false},
  {label: `we`, checked: true},
  {label: `th`, checked: false},
  {label: `fr`, checked: false},
  {label: `sa`, checked: true},
  {label: `su`, checked: false},
];

const getRandomRecentDate = () => {
  const WEEK = 7 * 24 * 60 * 60 * 1000;
  return Date.now() - WEEK + Math.floor(Math.random() * RECENT_WEEKS_NUM * WEEK);
};

export const getTask = () => ({
  title: taskTitles[Math.floor(Math.random() * taskTitles.length)],
  date: getRandomRecentDate(),
  tags: [...tags].splice(0, Math.ceil(Math.random() * MAX_TAGS_NUM)),
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

import { mountFilter } from './modules/filters';
import { mountTasks } from './modules/tasks';
import { INITIAL_TASKS_NUMBER } from './modules/common/constants';

mountFilter();
mountTasks(INITIAL_TASKS_NUMBER);



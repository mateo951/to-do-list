import Tasks from './tasks.js';

export default class Task {
  constructor(description) {
    this.description = description;
    this.completed = false;
    this.index = Tasks.tasksData.length;
  }
}
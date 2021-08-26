import Task from './task.js';

export default class Tasks {
  static tasksData = [];

  static initializeTasks(data) {
    this.tasksData = data;
  }

  static clear() {
    this.tasksData = [];
  }

  static getTasks() {
    return this.tasksData;
  }

  static getLenght() {
    return this.tasksData.length;
  }

  static addNewTask(description) {
    return this.tasksData.push(this.createTask(description));
  }

  static createTask(description) {
    return new Task(description);
  }
}
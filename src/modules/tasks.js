import Task from "./task";

export default class Tasks {
  static tasksData = [];

  static initializeTasks(data) {
    this.tasksData = data;
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
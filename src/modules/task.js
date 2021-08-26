import Tasks from "./tasks";
export default class Task {
  constructor(description) {
    this.description = description;
    this.completed = false;
    this.index = Tasks.getLenght();
  }
}
import Task from './task.js';
import Tasks from './tasks.js';

export default class Interactions {
  static addTask() {
    const inputData = document.getElementById('inputTask');
    if (this.hasValue(inputData.value)) {
      const newTask = new Task(inputData.value);
      Tasks.tasksData.push(newTask);
      this.updateDisplay(newTask);
      this.CheckInput();
    }
  }

  static updateDisplay(task) {
    const ul = document.querySelector('ul');
    ul.insertAdjacentHTML('beforeend', `<li><input type="checkbox" id="${task.index}"><h3 id="d${task.index}">${task.description}</h3><img src="https://img.icons8.com/ios-glyphs/30/000000/menu-2.png"/>`);
    this.addCheckboxEvent(task);
  }

  static hasValue(input) {
    if (input === '') {
      return false;
    }
    return true;
  }

  static addCheckboxEvent(task) {
    const checkbox = document.getElementById(task.index);
    checkbox.addEventListener('change', () => {
      task.completed = !task.completed;
      const desc = document.getElementById(`d${task.index}`);
      desc.classList.toggle('line-through');
    });
  }

  static CheckInput() {
    const storageAvailability = this.localStorageAv();
    if (storageAvailability) {
      this.HandleInputData();
    }
  }

  static localStorageAv() {
    const test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  static HandleInputData() {
    const jsonData = JSON.stringify(Tasks.tasksData);
    localStorage.setItem('data', jsonData);
  }
}
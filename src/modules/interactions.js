import Task from './task.js';
import Tasks from './tasks.js';

export default class Interactions {
  static editMode = false;

  static addTask() {
    const inputData = document.getElementById('inputTask');
    if (this.hasValue(inputData.value)) {
      const newTask = new Task(inputData.value);
      Tasks.tasksData.push(newTask);
      this.updateDisplay(newTask);
      this.CheckInput();
    }
  }

  static removeTask(task) {
    const liTask = document.getElementById(`l${task}`);
    this.rearrangeIds(task);
    Tasks.tasksData.splice(task, 1); // eslint-disable-next-line no-use-before-define
    this.CheckInput();
    liTask.remove();
  }

  static rearrangeIds(task) {
    if (task !== Tasks.tasksData.length) {
      for (let i = parseInt(task, 10); i < Tasks.tasksData.length - 1; i += 1) {
        const checkbox = document.getElementById(`${i + 1}`);
        const newLi = document.getElementById(`l${i + 1}`);
        const editInput = document.getElementById(`e${i + 1}`);
        const h3Text = document.getElementById(`d${i + 1}`);
        const deleteIcon = document.getElementById(`i${i + 1}`);
        const optionIcon = document.getElementById(`o${i + 1}`);
        Tasks.tasksData[i + 1].index = i;
        checkbox.id = i;
        newLi.id = `l${i}`;
        editInput.id = `e${i}`;
        h3Text.id = `d${i}`;
        deleteIcon.id = `i${i}`;
        optionIcon.id = `o${i}`;
      }
    }
  }

  static updateDisplay(task) {
    const ul = document.querySelector('#spawnTasks');
    ul.insertAdjacentHTML('beforeend', `<li id="l${task.index}">
    <input class="checkbox" type="checkbox" id="${task.index}">
    <h3 id="d${task.index}" onclick="toggleEdit(this)">${task.description}</h3>
    <input id="e${task.index}" class="edit editInput" onblur="toggleEdit(this)"></input>
    <img class="edit deleteIcon" onclick="removeTask(this)" id="i${task.index}" src="https://img.icons8.com/ios/50/000000/delete--v1.png"/>
    <img id="o${task.index}" src="https://img.icons8.com/ios-glyphs/30/000000/menu-2.png"/></li>`);
    this.addCheckboxEvent(task);
  }

  static updateDesc = (input, index, h3) => {
    Tasks.tasksData[index].description = input;
    h3.innerText = input;
    this.CheckInput();
  };

  static addCheckboxEvent(task) {
    const checkbox = document.getElementById(task.index);
    checkbox.addEventListener('change', () => {
      task.completed = !task.completed;
      const desc = document.getElementById(`d${task.index}`);
      desc.classList.toggle('line-through');
    });
  }

  static hasValue(input) {
    if (input === '') {
      return false;
    }
    return true;
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
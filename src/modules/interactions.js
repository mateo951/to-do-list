import Task from './task.js';
import Tasks from './tasks.js';

export default class Interactions {
  static editMode = false;
  // Refractor section start
  static validateInput(inputValue) {
    if(this.hasValue(inputValue)) return Tasks.addNewTask(inputValue);
  }

  static getInput(){
    return document.getElementById('inputTask').value;
  }
  
  static updateDisplay(task) {
    let completedStatus = Tasks.getTasks()[task.index].completed ? "checked" : "";
    let crossedStatus = completedStatus === "checked" ? "line-through" : "";
    document.querySelector('#spawnTasks').insertAdjacentHTML('beforeend', `<li id="l${task.index}">
    <input class="checkbox" type="checkbox" id="${task.index}" ${completedStatus}>
    <h3 id="d${task.index}" onclick="toggleEdit(this)" class="${crossedStatus}">${task.description}</h3>
    <input id="e${task.index}" class="edit editInput" onblur="toggleEdit(this)"></input>
    <img class="edit deleteIcon" onclick="removeTask(this)" id="i${task.index}" src="https://img.icons8.com/ios/50/000000/delete--v1.png"/>
    <img id="o${task.index}" src="https://img.icons8.com/ios-glyphs/30/000000/menu-2.png"/></li>`);
  }

  static addCheckboxEvent() {
    let task = Tasks.getTasks()[Tasks.getLenght() - 1];
    const checkbox = document.getElementById(task.index);
    checkbox.addEventListener('change', () => {
      task.completed = !task.completed;
      Tasks.getTasks()[task.index].completed = task.completed;
      const desc = document.getElementById(`d${task.index}`);
      desc.classList.toggle('line-through');
      this.checkInput();
    });
  }

  // Refractor section end

  static removeTask(task) {
    const liTask = document.getElementById(`l${task}`);
    this.rearrangeIds(task);
    Tasks.getTasks().splice(task, 1); // eslint-disable-next-line no-use-before-define
    this.checkInput();
    this.removeNode(liTask);
    return liTask
  }

  static removeNode(node) {
    node.remove();
  }

  static rearrangeIds(task) {
    if (task !== Tasks.getLenght()) {
      for (let i = parseInt(task, 10); i < Tasks.getLenght() - 1; i += 1) {
        const checkbox = document.getElementById(`${i + 1}`);
        const newLi = document.getElementById(`l${i + 1}`);
        const editInput = document.getElementById(`e${i + 1}`);
        const h3Text = document.getElementById(`d${i + 1}`);
        const deleteIcon = document.getElementById(`i${i + 1}`);
        const optionIcon = document.getElementById(`o${i + 1}`);
        Tasks.getTasks()[i + 1].index = i;
        checkbox.id = i;
        newLi.id = `l${i}`;
        editInput.id = `e${i}`;
        h3Text.id = `d${i}`;
        deleteIcon.id = `i${i}`;
        optionIcon.id = `o${i}`;
      }
    }
  }

  static updateDesc = (input, index, h3) => {
    Tasks.getTasks()[index].description = input;
    h3.innerText = input;
    this.checkInput();
  };

  static hasValue(input) {
    if (input === '') {
      return false;
    }
    return true;
  }

  static checkInput() {
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
    const jsonData = JSON.stringify(Tasks.getTasks());
    localStorage.setItem('data', jsonData);
  }
}
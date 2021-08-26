/* eslint-disable */
import _, { intersection } from 'lodash'; /* eslint-enable */
import './style.css';
import interactions from './modules/interactions.js';
import tasks from './modules/tasks.js';

// Refractor section start
const inputHandler = () => {
  if(interactions.validateInput(interactions.getInput())) {
    interactions.updateDisplay(Tasks.getTasks()[Tasks.getLenght() - 1]);
    interactions.addCheckboxEvent();
    interactions.checkInput(); 
  }
  input.value = '';
}

const input = document.querySelector("#formTask input[type='text']");
document.querySelector('#submitBttn').addEventListener('click', inputHandler);
document.querySelector('#formTask').addEventListener('submit', inputHandler);
// Refractor section end

const checkLocalInput = () => {
  const data = JSON.parse(localStorage.getItem('data'));
  if (data !== null) {
    tasks.initializeTasks(data);
    for (let i = 0; i < data.length; i += 1) {
      if (interactions.hasValue(data[i])) {
        interactions.updateDisplay(data[i]);
      }
    }
  }
};
// window.localStorage.clear();
const edit = function (taskH3) {
  const editInput = document.getElementById(`e${taskH3.id.substring(1)}`);
  const h3Text = document.getElementById(`d${taskH3.id.substring(1)}`);
  const deleteIcon = document.getElementById(`i${taskH3.id.substring(1)}`);
  const optionIcon = document.getElementById(`o${taskH3.id.substring(1)}`);
  const editLi = document.getElementById(`l${taskH3.id.substring(1)}`);

  if (taskH3 && editLi && editInput && h3Text && deleteIcon && optionIcon) {
    interactions.editMode = !interactions.editMode;
    if (editInput.value !== tasks.tasksData[taskH3.id.substring(1)].description) {
      if (!interactions.editMode && editInput.value === '' && taskH3.tagName === 'INPUT') {
        interactions.editMode = !interactions.editMode; /* eslint-disable-next-line */
        removeTask(taskH3);
      } else if (interactions.hasValue(editInput.value)) {
        interactions.updateDesc(editInput.value, taskH3.id.substring(1), h3Text);
      }
    }

    h3Text.classList.toggle('edit');
    editLi.classList.toggle('editLi');
    optionIcon.classList.toggle('edit');
    editInput.classList.toggle('edit');
    deleteIcon.classList.toggle('edit');
    if (interactions.editMode) {
      editInput.value = h3Text.innerText;
      editInput.focus();
    }
  }
};
//window.localStorage.clear();
window.toggleEdit = function (taskH3) {
  setTimeout(() => { edit(taskH3); }, 100);
};

window.removeTask = function (task) {
  interactions.editMode = !interactions.editMode;
  const taskSelected = document.getElementById(task.id);
  interactions.removeTask(taskSelected.id.substring(1), false);
};

const clearCompleted = () => {
  const bttn = document.getElementById('clearCompleted');
  bttn.addEventListener('click', () => {
    const checkboxs = document.getElementsByClassName('checkbox');
    if (checkboxs) {
      tasks.tasksData = tasks.tasksData.filter((task) => !task.completed);
      const ul = document.getElementById('spawnTasks');
      ul.innerHTML = '';
      for (let i = 0; i < tasks.tasksData.length; i += 1) {
        tasks.tasksData[i].index = i;
        interactions.updateDisplay(tasks.tasksData[i]);
      }
      interactions.checkInput();
    }
  });
};

clearCompleted();
checkLocalInput();
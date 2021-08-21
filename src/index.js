/* eslint-disable */
import _, { intersection } from 'lodash'; /* eslint-enable */
import './style.css';
import Interactions from './modules/interactions.js';
import Tasks from './modules/tasks.js';

document.querySelector('#formTask').addEventListener('click', () => {
  Interactions.addTask();
  const input = document.querySelector("#formTask input[type='text']");
  input.value = '';
});

document.querySelector('#formTask').addEventListener('submit', () => {
  Interactions.addTask();
  const input = document.querySelector("#formTask input[type='text']");
  input.value = '';
});

const checkLocalInput = () => {
  const data = JSON.parse(localStorage.getItem('data'));
  if (data !== null) {
    Tasks.initializeTasks(data);
    for (let i = 0; i < data.length; i += 1) {
      if (Interactions.hasValue(data[i])) {
        Interactions.updateDisplay(data[i]);
      }
    }
  }
};

const edit = function (taskH3) {
  const editInput = document.getElementById(`e${taskH3.id.substring(1)}`);
  const h3Text = document.getElementById(`d${taskH3.id.substring(1)}`);
  const deleteIcon = document.getElementById(`i${taskH3.id.substring(1)}`);
  const optionIcon = document.getElementById(`o${taskH3.id.substring(1)}`);
  const editLi = document.getElementById(`l${taskH3.id.substring(1)}`);

  if (taskH3 && editLi && editInput && h3Text && deleteIcon && optionIcon) {
    Interactions.editMode = !Interactions.editMode;
    if (editInput.value !== Tasks.tasksData[taskH3.id.substring(1)].description) {
      if (!Interactions.editMode && editInput.value === '' && taskH3.tagName === 'INPUT') {
        Interactions.editMode = !Interactions.editMode; /* eslint-disable-next-line */
        removeTask(taskH3);
      } else if (Interactions.hasValue(editInput.value)) {
        Interactions.updateDesc(editInput.value, taskH3.id.substring(1), h3Text);
      }
    }

    h3Text.classList.toggle('edit');
    editLi.classList.toggle('editLi');
    optionIcon.classList.toggle('edit');
    editInput.classList.toggle('edit');
    deleteIcon.classList.toggle('edit');
    if (Interactions.editMode) {
      editInput.value = h3Text.innerText;
      editInput.focus();
    }
  }
};

window.toggleEdit = function (taskH3) {
  setTimeout(() => { edit(taskH3); }, 100);
};

window.removeTask = function (task) {
  Interactions.editMode = !Interactions.editMode;
  const taskSelected = document.getElementById(task.id);
  Interactions.removeTask(taskSelected.id.substring(1), false);
};

const clearCompleted = () => {
  const bttn = document.getElementById('clearCompleted');
  bttn.addEventListener('click', () => {
    const checkboxs = document.getElementsByClassName('checkbox');
    if (checkboxs) {
      Tasks.tasksData = Tasks.tasksData.filter((task) => !task.completed);
      const ul = document.getElementById('spawnTasks');
      ul.innerHTML = '';
      for (let i = 0; i < Tasks.tasksData.length; i += 1) {
        Tasks.tasksData[i].index = i;
        Interactions.updateDisplay(Tasks.tasksData[i]);
      }
      Interactions.CheckInput();
    }
  });
};

clearCompleted();
checkLocalInput();
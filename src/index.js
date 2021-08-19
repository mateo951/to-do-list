/* eslint-disable */
import _, { intersection } from 'lodash'; /* eslint-enable */
import './style.css';
import Interactions from './modules/interactions.js';
import Tasks from './modules/tasks.js';

document.querySelector('#submitBttn').addEventListener('click', () => {
  Interactions.addTask();
});

document.querySelector('#formTask').addEventListener('submit', () => {
  Interactions.addTask();
});

function CheckLocalInput() {
  const data = JSON.parse(localStorage.getItem('data'));
  if (data !== null) {
    Tasks.initializeTasks(data);
    for (let i = 0; i < data.length; i += 1) {
      if (Interactions.hasValue(data[i])) {
        Interactions.updateDisplay(data[i]);
      }
    }
  }
}

CheckLocalInput();

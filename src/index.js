/* eslint-disable */
import _ from 'lodash'; /* eslint-enable */
import './style.css';

const tasks = [
  {
    description: 'Finish tasks in Microverse',
    completed: false,
    index: null,
  },
  {
    description: 'Meet with mentees',
    completed: false,
    index: null,
  },
  {
    description: 'Study FrontEnd Masters course',
    completed: false,
    index: null,
  },
  {
    description: 'Wash dishes',
    completed: false,
    index: null,
  },
];

const displayTasks = () => {
  const ul = document.querySelector('ul');
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i;
    ul.innerHTML += `<li><input type="checkbox"><h3>${tasks[i].description}</h3><img src="https://img.icons8.com/ios-glyphs/30/000000/menu-2.png"/>`;
  }
};

displayTasks();
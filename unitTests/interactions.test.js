/**
 * @jest-environment jsdom
 */

import { expect, test } from '@jest/globals';
import Interactions from '.././src/modules/interactions.js';
import tasks from '.././src/modules/tasks.js';
import LocalStorageMock from './localStorageMock';

let localStorage = new LocalStorageMock();

beforeAll(() => {
  document.body.innerHTML = '<ul id="spawnTasks"></ul>'
  tasks.addNewTask('Clean my room');
  tasks.addNewTask('Clean my room v2');
  tasks.addNewTask('Clean my room v3');
  localStorage.setItem('tasks', JSON.stringify(tasks.getTasks()));
});

describe('Should add a new task', () => {
  test('Checks for new task', () => {
    expect(tasks.getTasks()[0].description).toEqual('Clean my room');
  });
  test('Checks for new task in localStorage', () => {
    expect(JSON.parse(localStorage.getItem('tasks')).length).toBe(3);
  });
  test('Checks for new tasks in dom', () => {
    Interactions.updateDisplay(tasks.getTasks()[0]);
    expect(document.getElementById('spawnTasks').childNodes).toHaveLength(1);
  })
});

describe('Should remove a task', () => {
  test('remove existing task from list', () => {
    // Interactions.rearrangeIds() = jest.fn();
    console.log(tasks.getTasks());
    console.log(document.body.innerHTML);
    const Interactions.rearrangeIds = jest.fn()
    const checkInput = jest.fn()
    Interactions.removeTask(0)
    expect(tasks.getLenght()).toEqual(2);
    // expect(document.getElementById('spawnTasks').childNodes).toHaveLength(1);
    // expect(tasks.getTasks()[0].description).toEqual('Clean my room');
  });
  // test('Checks for new task in localStorage', () => {
  //   expect(JSON.parse(localStorage.getItem('tasks')).length).toBe(3);
  // });
  // test('Checks for new tasks in dom', () => {
  //   Interactions.updateDisplay(tasks.getTasks()[0]);
  //   expect(document.getElementById('spawnTasks').childNodes).toHaveLength(1);
  // })
});

// const removeTask = (task) => {
//   const liTask = document.getElementById(`l${task}`);
//   // this.rearrangeIds(task);
//   tasks.getTasks().splice(task, 1); // eslint-disable-next-line no-use-before-define
//   // this.checkInput();
//   liTask.remove();
// }




// describe('Add task method', () => {
//   test('getInput should have been called', () => {
//     Interactions.getInput = jest.fn();
//     Interactions.addTask();
//     expect(Interactions.getInput).toHaveBeenCalled();
//   });
//   test('addNewTask should have been called', () => {
//     Interactions.pushNewTask = jest.fn();
//     Interactions.addTask();
//     expect(Interactions.addNewTask).toHaveBeenCalled();
//   });
//   test('updateDisplay should have been called', () => {
//     Interactions.updateDisplay = jest.fn();
//     Interactions.addTask();
//     expect(Interactions.updateDisplay).toHaveBeenCalled();
//   });
//   test('CheckInput should have been called', () => {
//     Interactions.CheckInput = jest.fn();
//     Interactions.addTask();
//     expect(Interactions.CheckInput).toHaveBeenCalled();
//   });
// });


  
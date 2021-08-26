/**
 * @jest-environment jsdom
 */

import { expect, test } from '@jest/globals';
import Interactions from '.././src/modules/interactions.js';
import tasks from '.././src/modules/tasks.js';
import LocalStorageMock from './localStorageMock';

let localStorage = new LocalStorageMock();

beforeEach(() => {
  document.body.innerHTML = '<ul id="spawnTasks"></ul>'
  tasks.addNewTask('Clean my room');
  tasks.addNewTask('Clean my room v2');
  tasks.addNewTask('Clean my room v3');
  localStorage.setItem('tasks', JSON.stringify(tasks.getTasks()));
});

afterEach(() => {
  localStorage.clear();
  tasks.clear();
  document.body.innerHTML = '<ul id="spawnTasks"></ul>'
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

    Interactions.rearrangeIds = jest.fn();
    Interactions.checkInput = jest.fn();
    Interactions.removeNode = jest.fn();
    Interactions.removeTask(0);
    expect(tasks.getLenght()).toEqual(2);
  });
  test('Check for li removal in dom', () => {
    Interactions.updateDisplay(tasks.getTasks()[0]);
    Interactions.updateDisplay(tasks.getTasks()[1]);
    Interactions.updateDisplay(tasks.getTasks()[2]);
    Interactions.rearrangeIds = jest.fn();
    Interactions.checkInput = jest.fn();
    Interactions.removeNode = jest.fn();
    Interactions.removeTask(2).remove(); 
    expect(document.getElementById('spawnTasks').childNodes).toHaveLength(2);
  });
});
  
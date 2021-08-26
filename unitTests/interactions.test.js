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

import Interactions from '.././src/modules/interactions.js';

describe('Add task method', () => {
  test('getInput should have been called', () => {
    Interactions.updateDisplay = jest.fn();
    Interactions.getInput = jest.fn();
    Interactions.addTask();
    expect(Interactions.getInput).toHaveBeenCalled();
  });
  test('pushNewTask should have been called', () => {
    Interactions.updateDisplay = jest.fn();
    Interactions.pushNewTask = jest.fn();
    Interactions.addTask();
    expect(Interactions.pushNewTask).toHaveBeenCalled();
  });
  test('updateDisplay should have been called', () => {
    Interactions.updateDisplay = jest.fn();
    Interactions.addTask();
    expect(Interactions.updateDisplay).toHaveBeenCalled();
  });
  test('CheckInput should have been called', () => {
    Interactions.updateDisplay = jest.fn();
    Interactions.CheckInput = jest.fn();
    Interactions.addTask();
    expect(Interactions.CheckInput).toHaveBeenCalled();
  });
});

import { waysToStep } from '.';

describe('waysToStep', () => {
  test('Test case 1', () => {
    expect(waysToStep(3)).toBe(4);
  });

  test('Test case 2', () => {
    expect(waysToStep(5)).toBe(13);
  });

  test('Test case 3', () => {
    expect(waysToStep(10)).toBe(274);
  });

  test('Test case 4', () => {
    expect(waysToStep(61)).toBe(752119970);
  });
});

import { minimalKSum } from './index';

describe('minimalKSum', () => {
  test('Test case 1', () => {
    const nums = [1,4,25,10,25];
    const k = 2;
    expect(minimalKSum(nums, k)).toEqual(5);
  });

  test('Test case 2', () => {
    const nums = [5,6];
    const k = 6;
    expect(minimalKSum(nums, k)).toEqual(25);
  });
});

import { myNew } from '.';

describe('myNew', () => {
  test('should return a new object', () => {
    function Person(name) {
      this.name = name;
    }

    const person = myNew(Person, 'Tom');

    expect(person.name).toBe('Tom');
    expect(person instanceof Person).toBe(true);
  });
});

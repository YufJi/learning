import { mvvm } from '.';

describe('mvvm', () => {
  it('should create a new instance of MVVM', () => {
    const options = {
      data: {
        name: 'John',
        age: 30
      }
    };

    let string = `My name is ${options.data.name} and I am ${options.data.age} years old.`;
    const cb = (data) => {
      string = `My name is ${data.name} and I am ${data.age} years old.`;
    };

    const vm = new mvvm(options);
    vm.render(cb);

    expect(string).toEqual('My name is John and I am 30 years old.');

    vm.data.name = 'Jane';
    vm.data.age = 25;

    expect(string).toEqual('My name is Jane and I am 25 years old.');
  });
});

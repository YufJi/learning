import { GetMinStack } from '.';

describe('GetMinStack', () => {
  it('should return the min value', () => {
    const getMinStack = new GetMinStack();
    getMinStack.push(3);
    getMinStack.push(2);
    getMinStack.push(1);
    expect(getMinStack.getMin()).toBe(1);
    getMinStack.pop();
    expect(getMinStack.getMin()).toBe(2);
  });
});


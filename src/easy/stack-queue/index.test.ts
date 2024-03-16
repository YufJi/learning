import { StackQueue } from '.';

/**
 * 输入格式:
第一行输入是操作的序列，即MinStack类之中的成员函数；

第二行输入是成员函数所对应的参数，若没有参数则输入为 []

输出格式:
输出为对应序列中每个操作的返回值

输入样例:
在这里给出一组输入。例如：

push,push,peek,pop,empty
1,2,,,
输出样例:
在这里给出相应的输出。例如：

null,null,1,1,false
 */

describe('easy/StackQueue', () => {
  it('should return the correct result', () => {
    const myQueue = new StackQueue();
    myQueue.push(1);
    myQueue.push(2);
    expect(myQueue.peek()).toBe(1);
    expect(myQueue.pop()).toBe(1);
    expect(myQueue.empty()).toBe(false);
    expect(myQueue.pop()).toBe(2);
    expect(myQueue.empty()).toBe(true);
  });
});

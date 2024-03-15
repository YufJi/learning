/**
 * 请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）：

实现 MyQueue 类：

void push(int x) 将元素 x 推到队列的末尾

int pop() 从队列的开头移除并返回元素

int peek() 返回队列开头的元素

boolean empty() 如果队列为空，返回 true ；否则，返回 false

注意：返回的的字符串结果需要是小写的格式

说明：

你 只能 使用标准的栈操作 —— 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。

你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
 */

import { Stack } from '@/shared/Stack';

class StackQueue {
  private stackPush: Stack<number>;
  private stackPop: Stack<number>;

  constructor() {
    this.stackPush = new Stack();
    this.stackPop = new Stack();
  }

  push(x: number): void {
    this.stackPush.push(x);
  }

  pop() {
    this.pushToPop();
    return this.stackPop.pop();
  }

  peek() {
    this.pushToPop();
    return this.stackPop.peek();
  }

  empty() {
    return this.stackPush.isEmpty() && this.stackPop.isEmpty();
  }

  // 倒入
  private pushToPop() {
    if (this.stackPop.isEmpty()) {
      while (!this.stackPush.isEmpty()) {
        this.stackPop.push(this.stackPush.pop());
      }
    }
  }
}

export {
  StackQueue
};

# Promise实现

## 规范 

### Promise/A+规范

Promise/A+规范是一个关于Promise的规范，它定义了一个符合Promise的最小规范，以便开发者能够更好的使用Promise。

### Promise/A+规范的三个状态

- pending: 初始状态，既不是成功，也不是失败状态。
- fulfilled: 意味着操作成功完成。
- rejected: 意味着操作失败。

### Promise/A+规范的API

- then: then方法可以接收两个参数，第一个参数是成功的回调，第二个参数是失败的回调。
- catch: catch方法是then方法的语法糖，只接收失败的回调。
- finally: finally方法是无论成功还是失败都会执行的回调。

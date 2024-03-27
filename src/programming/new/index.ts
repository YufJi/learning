export function myNew(fn, ...args) {
  // 创建一个新对象
  let obj = new Object();

  // 获取构造函数
  let Constructor = fn;

  // @ts-ignore
  obj.__proto__ = Constructor.prototype;

  // 绑定 this
  let result = Constructor.apply(obj, args);

  // 返回结果
  return result instanceof Object ? result : obj;
}


// 判断 left 是否是 right 的实例
export function myInstanceof(left, right) {
  if (typeof left !== 'object' || left === null) return false;

  let proto = Object.getPrototypeOf(left);
  let prototype = right.prototype;

  while (true) {
    if (proto === null) return false;
    if (proto === prototype) return true;

    proto = Object.getPrototypeOf(proto);
  }
}

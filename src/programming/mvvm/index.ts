
export function mvvm(options, ) {
  // this.data = options.data;
  // observe(this.data);

  this.data = observeProxy(options.data);
}

mvvm.prototype = {
  render(cb) {
    new Watcher(this, 'data', cb);
  }
};

function observe(target) {
  if (!target || typeof target !== 'object') {
    return;
  }
  
  Object.keys(target).forEach(key => {
    defineRective(target, key, target[key]);
  });

  function defineRective(target, key, value) {
    observe(value);

    const dep = new Dep();

    Object.defineProperty(target, key, {
      enumerable: true,
      configurable: true, 
      get() {
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
        return value;
      },
      set(newVal) {
        if (newVal !== value) {
          observe(newVal);
          value = newVal;
          dep.notify();
        }
      }
    });
  }
}

function observeProxy(target) {
  if (!target || typeof target !== 'object') {
    return target;
  }

  const dep = new Dep();
  const handler = {
    get(target, key) {
      observeProxy(target[key]);

      if (Dep.target) {
        dep.addSub(Dep.target);
      }

      return Reflect.get(target, key);
    },
    set(target, key, value) {
      if (Reflect.get(target, key) !== value) {
        Reflect.set(target, key, observeProxy(value));
        dep.notify();
        return true;
      }
    }
  };

  return new Proxy(target, handler);
}

function Dep() {
  this.subs = [];
}

Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub);
  },
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
};

Dep.target = null;

function Watcher(target, key, cb) {
  Dep.target = this;
  
  this.cb = cb;
  this.target = target;
  this.key = key;
  this.value = target[key];
  cb(this.value);

  Dep.target = null;
}

Watcher.prototype = {
  update() {
    this.value = this.target[this.key];
    this.cb(this.value);
  }
};

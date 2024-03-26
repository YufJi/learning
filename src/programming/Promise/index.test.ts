import { MyPromise } from '.';

describe('MyPromise', () => {
  it('should resolve', (done) => {
    const promise = new MyPromise((resolve) => {
      resolve(1);
    });

    promise.then((value) => {
      expect(value).toBe(1);
      done();
    });
  });

  it('should reject', (done) => {
    const promise = new MyPromise((resolve, reject) => {
      reject('error');
    });

    promise.catch((reason) => {
      expect(reason).toBe('error');
      done();
    });
  });

  it('should chain', (done) => {
    const promise = new MyPromise((resolve) => {
      resolve(1);
    });

    promise
      .then((value) => {
        expect(value).toBe(1);
        return 2;
      })
      .then((value) => {
        expect(value).toBe(2);
        done();
      });
  });

  it('should catch', (done) => {
    const promise = new MyPromise((resolve, reject) => {
      reject('error');
    });

    promise
      .then(() => {
        // do nothing
      })
      .catch((reason) => {
        expect(reason).toBe('error');
        done();
      })
      .catch(() => {
        // do nothing
        expect(true).toBe(false);
      });
  });

  it('should resolve static', (done) => {
    MyPromise.resolve(1).then((value) => {
      expect(value).toBe(1);
      done();
    });
  });

  it('should reject static', (done) => {
    MyPromise.reject('error').catch((reason) => {
      expect(reason).toBe('error');
      done();
    });
  });

  it('should chain static', (done) => {
    MyPromise.resolve(1)
      .then((value) => {
        expect(value).toBe(1);
        return 2;
      })
      .then((value) => {
        expect(value).toBe(2);
        done();
      });
  });

  it('should all', (done) => {
    MyPromise.all([
      MyPromise.resolve(1),
      MyPromise.resolve(2),
    ]).then((values) => {
      expect(values).toEqual([1, 2]);
      done();
    });
  });

  it('should race', (done) => {
    MyPromise.race([
      MyPromise.resolve(1),
      MyPromise.resolve(2),
    ]).then((value) => {
      expect(value).toBe(1);
      done();
    });
  });
});

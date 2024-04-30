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

interface Params {
  page?: number;
  size?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  filter?: string;
}

// 数组数据源
const data1 = [
  { name: 'a', age: 1 },
  { name: 'b', age: 2 },
  { name: 'c', age: 3 },
];

// 模拟数据查询
const fetch: () => Promise<typeof data1> = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data1);
    }, 1000);
  });
};

// 逻辑数据源
const logic1 = async(params: Params) => {
  // do something params可用可不用
  const result = await fetch();
  return result;
};

// 包装load
function createLoader(dataSource) {
  return async(params: Params) => {
    if (Array.isArray(dataSource)) {
      const result = dataSource; // 按分页、筛选排序等处理
      return result;
    } else {
      const result = await dataSource(params);
      return result;
    }
  };
}

const loader = createLoader(data1);

// 组件内部状态
const enum Order {
  Asc = 'asc',
  Desc = 'desc',
}

const state = {
  data: [],
  page: 1,
  size: 10,
  sort: 'age',
  order: Order.Asc,
  filter: '',
  
  loading: false,
  error: null,
};
const enum UpdateDateType {
  NORMAL = 'normal',
  LOADMORE = 'loadmore',
  REFRESH = 'refresh',
  PAGINATION = 'pagination',
}

const updateData = (data, type: UpdateDateType) => {
  if (type === UpdateDateType.REFRESH) {
    state.data = data;
  } else if (type === UpdateDateType.PAGINATION) {
    state.data = data;
  } else if (type === UpdateDateType.LOADMORE) {
    state.data = state.data.concat(data);
  }
};

// 初始加载
const initLoad = () => {
  if (state.loading) return;

  state.loading = true;
  loader({
    page: 1,
    size: state.size,
    sort: state.sort,
    order: state.order,
    filter: state.filter,
  }).then((result) => {
    updateData(result, UpdateDateType.NORMAL);
  }).finally(() => {
    state.loading = false;
  });
};

// 加载更多
const loadMore = () => {
  if (state.loading) return;

  state.loading = true;
  const page = state.page + 1;
  loader({
    page,
    size: state.size,
    sort: state.sort,
    order: state.order,
    filter: state.filter,
  }).then((result) => {
    updateData(result, UpdateDateType.LOADMORE);

    state.page = page;
  }).finally(() => {
    state.loading = false;
  });
};

// 刷新
const refresh = () => {
  if (state.loading) return;

  state.loading = true;
  loader({
    page: 1,
    size: state.size,
    sort: state.sort,
    order: state.order,
    filter: state.filter,
  }).then((result) => {
    updateData(result, UpdateDateType.REFRESH);

    state.page = 1;
  }).finally(() => {
    state.loading = false;
  });
};

// 排序 筛选变动时
const onSortChange = (sort: string, order: Order) => {
  state.sort = sort;
  state.order = order;
  refresh();
};
const onFilterChange = (filter: string) => {
  state.filter = filter;
  refresh();
};

import { Expect, Equal } from '../types';
import { MyPick } from '.';

describe('Pick', () => {
  it('should pick', () => {
    type Test = {
      a: number;
      b: string;
      c: boolean;
    };

    type Result = MyPick<Test, 'a' | 'b'>;

    type Expected = {
      a: number;
      b: string;
    };

    const test0: Expect<Equal<Result, Expected>> = true;
  });

  it('should pick', () => {
    type Test = {
      a: number;
      b: string;
      c: boolean;
    };

    type Result = MyPick<Test, 'b' | 'c'>;

    type Expected = {
      b: string;
      c: boolean;
    };

    const test0: Expect<Equal<Result, Expected>> = true;
  });

  it('should pick', () => {
    type Test = {
      a: number;
      b: string;
      c: boolean;
    };

    type Result = MyPick<Test, 'a'>;

    type Expected = {
      a: number;
    };

    const test0: Expect<Equal<Result, Expected>> = true;
  });
});

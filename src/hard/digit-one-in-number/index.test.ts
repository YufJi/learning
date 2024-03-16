import { countDigitOneCrude, countDigitOne } from '.';

describe('countDigitOne', () => {
  it('should return the number of digit 1 in the number', () => {
    expect(countDigitOneCrude(13)).toBe(6);
    expect(countDigitOneCrude(0)).toBe(0);
    expect(countDigitOneCrude(1)).toBe(1);
    expect(countDigitOneCrude(10)).toBe(2);
  });

  it('should return the number of digit 1 in the number', () => {
    expect(countDigitOne(13)).toBe(6);
    expect(countDigitOne(0)).toBe(0);
    expect(countDigitOne(1)).toBe(1);
    expect(countDigitOne(10)).toBe(2);
  });
});

import { getWaterCrude, getWaterCrudeOptimized, getWater } from '.';

describe('hard/get-water', () => {
  it('should get water crude', () => {
    expect(getWaterCrude([0,1,0,2,1,0,1,3,2,1,2,1])).toBe(6);
    expect(getWaterCrude([4,2,0,3,2,5])).toBe(9);
  });

  it('should get water crude optimized', () => {
    expect(getWaterCrudeOptimized([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
    expect(getWaterCrudeOptimized([4, 2, 0, 3, 2, 5])).toBe(9);
  });

  it('should get water', () => {
    expect(getWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
    expect(getWater([4, 2, 0, 3, 2, 5])).toBe(9);
  });
});


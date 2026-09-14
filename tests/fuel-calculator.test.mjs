import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateFuelCosts, validateFuelInputs } from '../src/lib/fuel-calculator.js';

test('calculates fuel economy and costs from distance, fuel, and unit price', () => {
  assert.deepEqual(calculateFuelCosts({ distance: 600, fuel: 45, unitPrice: 1650 }), {
    fuelEconomy: 13.333333333333334,
    totalCost: 74250,
    costPerKm: 123.75,
    costPer100Km: 12375,
  });
});

test('rejects zero values before division', () => {
  assert.deepEqual(validateFuelInputs({ distance: 0, fuel: 45, unitPrice: 1650 }), {
    valid: false,
    errors: { distance: '주행거리는 0보다 커야 합니다.' },
  });
  assert.deepEqual(validateFuelInputs({ distance: 600, fuel: 0, unitPrice: 1650 }), {
    valid: false,
    errors: { fuel: '사용한 연료량은 0보다 커야 합니다.' },
  });
});

test('rejects negative and non-numeric values', () => {
  const result = validateFuelInputs({ distance: -1, fuel: 'abc', unitPrice: -100 });
  assert.equal(result.valid, false);
  assert.equal(result.errors.distance, '주행거리는 0보다 커야 합니다.');
  assert.equal(result.errors.fuel, '사용한 연료량을 숫자로 입력해 주세요.');
  assert.equal(result.errors.unitPrice, '연료 단가는 0보다 커야 합니다.');
});

test('rejects values outside practical input limits', () => {
  const result = validateFuelInputs({ distance: 10000001, fuel: 10001, unitPrice: 1000001 });
  assert.equal(result.valid, false);
  assert.equal(result.errors.distance, '주행거리는 10,000,000km 이하로 입력해 주세요.');
  assert.equal(result.errors.fuel, '사용한 연료량은 10,000L 이하로 입력해 주세요.');
  assert.equal(result.errors.unitPrice, '연료 단가는 1,000,000원/L 이하로 입력해 주세요.');
});

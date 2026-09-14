import test from 'node:test';
import assert from 'node:assert/strict';
import { buildMaintenancePlan, validateMaintenanceInput } from '../src/lib/maintenance-planner.js';

const normalInput = {
  currentMileage: 50000,
  oilMileage: 48000,
  tireStatus: 'recent',
  batteryStatus: 'recent',
  brakeStatus: 'none',
};

test('returns no attention items for a normal vehicle state', () => {
  const plan = buildMaintenancePlan(normalInput);
  assert.equal(plan.summaryCount, 0);
  assert.deepEqual(plan.items.map((item) => item.status), ['OK', 'OK', 'OK', 'OK']);
  assert.equal(plan.items.find((item) => item.key === 'engineOil').mileageSinceService, 2000);
});

test('calculates oil mileage difference without making an absolute replacement decision', () => {
  const plan = buildMaintenancePlan({ ...normalInput, currentMileage: 80000, oilMileage: 65000, tireStatus: 'old', batteryStatus: 'unknown' });
  const oil = plan.items.find((item) => item.key === 'engineOil');
  assert.equal(oil.mileageSinceService, 15000);
  assert.equal(oil.status, 'CHECK');
  assert.match(oil.reason, /제조사 매뉴얼/);
  assert.equal(plan.items.find((item) => item.key === 'tire').status, 'CHECK');
  assert.equal(plan.items.find((item) => item.key === 'battery').status, 'CHECK');
});

test('marks brake noise and weak starting as attention with safety guidance', () => {
  const plan = buildMaintenancePlan({ ...normalInput, brakeStatus: 'noise', batteryStatus: 'weak' });
  assert.equal(plan.items.find((item) => item.key === 'brake').status, 'ATTENTION');
  assert.equal(plan.items.find((item) => item.key === 'battery').status, 'ATTENTION');
  assert.equal(plan.safetyNotice, true);
});

test('rejects an oil mileage greater than current mileage', () => {
  const result = validateMaintenanceInput({ ...normalInput, currentMileage: 50000, oilMileage: 55000 });
  assert.equal(result.valid, false);
  assert.equal(result.errors.oilMileage, '엔진오일 교체 주행거리는 현재 주행거리보다 클 수 없습니다.');
});

test('rejects empty, negative, non-numeric, and impractically large mileage', () => {
  const result = validateMaintenanceInput({ currentMileage: -1, oilMileage: 'abc' });
  assert.equal(result.valid, false);
  assert.equal(result.errors.currentMileage, '현재 주행거리는 0보다 커야 합니다.');
  assert.equal(result.errors.oilMileage, '엔진오일 교체 주행거리를 숫자로 입력해 주세요.');
  const large = validateMaintenanceInput({ currentMileage: 10000001, oilMileage: 10000000 });
  assert.equal(large.errors.currentMileage, '현재 주행거리는 10,000,000km 이하로 입력해 주세요.');
});

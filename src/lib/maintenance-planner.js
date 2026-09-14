const MAX_MILEAGE = 10_000_000;
const statusRank = { ATTENTION: 0, CHECK: 1, SOON: 2, OK: 3 };

const numberValue = (value) => typeof value === 'number' ? value : Number(value);

export function validateMaintenanceInput(input) {
  const errors = {};
  const current = numberValue(input.currentMileage);
  const oil = numberValue(input.oilMileage);
  if (!Number.isFinite(current)) errors.currentMileage = '현재 주행거리를 숫자로 입력해 주세요.';
  else if (current <= 0) errors.currentMileage = '현재 주행거리는 0보다 커야 합니다.';
  else if (current > MAX_MILEAGE) errors.currentMileage = '현재 주행거리는 10,000,000km 이하로 입력해 주세요.';
  if (input.oilMileage !== '' && input.oilMileage !== undefined && input.oilMileage !== null) {
    if (!Number.isFinite(oil)) errors.oilMileage = '엔진오일 교체 주행거리를 숫자로 입력해 주세요.';
    else if (oil < 0) errors.oilMileage = '엔진오일 교체 주행거리는 0 이상이어야 합니다.';
    else if (oil > MAX_MILEAGE) errors.oilMileage = '엔진오일 교체 주행거리는 10,000,000km 이하로 입력해 주세요.';
    else if (Number.isFinite(current) && oil > current) errors.oilMileage = '엔진오일 교체 주행거리는 현재 주행거리보다 클 수 없습니다.';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

const guide = {
  engineOil: { label: 'ENGINE OIL', guideHref: '/guides/engine-oil-change-interval/', guideLabel: '엔진오일 교체 주기' },
  tire: { label: 'TIRE', guideHref: '/guides/tire-pressure/', guideLabel: '타이어 공기압 확인' },
  battery: { label: 'BATTERY', guideHref: '/guides/car-battery-replacement/', guideLabel: '배터리 교체 시기' },
  brake: { label: 'BRAKE', guideHref: '/guides/brake-pad-replacement/', guideLabel: '브레이크 패드 교체 시기' },
};

export function buildMaintenancePlan(input) {
  const current = numberValue(input.currentMileage);
  const oil = input.oilMileage === '' || input.oilMileage === undefined ? null : numberValue(input.oilMileage);
  const oilDistance = oil === null || !Number.isFinite(current) ? null : current - oil;
  const oilStatus = oil === null ? 'CHECK' : oilDistance >= 10_000 ? 'CHECK' : 'OK';
  const items = [
    { key: 'engineOil', ...guide.engineOil, status: oilStatus, mileageSinceService: oilDistance, reason: oil === null ? '마지막 교체 주행거리를 모르는 상태입니다.' : `${oilDistance.toLocaleString('ko-KR')}km 주행 · 제조사 매뉴얼과 비교하세요.`, action: '차량별 엔진오일 교체 기준을 매뉴얼에서 확인하세요.' },
    { key: 'tire', ...guide.tire, status: input.tireStatus === 'recent' ? 'OK' : 'CHECK', reason: input.tireStatus === 'recent' ? '최근 점검한 상태입니다.' : '공기압 점검 시점을 확인해야 합니다.', action: '냉간 상태에서 네 바퀴 공기압을 확인하세요.' },
    { key: 'battery', ...guide.battery, status: input.batteryStatus === 'recent' ? 'OK' : input.batteryStatus === 'weak' ? 'ATTENTION' : 'CHECK', reason: input.batteryStatus === 'recent' ? '최근 점검 또는 교체했습니다.' : input.batteryStatus === 'weak' ? '시동이 약해진 느낌이 선택되었습니다.' : '배터리 상태를 확인해야 합니다.', action: input.batteryStatus === 'weak' ? '배터리와 충전계통 점검을 권장합니다.' : '배터리 상태 측정을 고려하세요.' },
    { key: 'brake', ...guide.brake, status: input.brakeStatus === 'none' ? 'OK' : input.brakeStatus === 'noise' || input.brakeStatus === 'feel' ? 'ATTENTION' : 'CHECK', reason: input.brakeStatus === 'none' ? '보고된 이상이 없습니다.' : input.brakeStatus === 'noise' ? '브레이크 소음이 선택되었습니다.' : input.brakeStatus === 'feel' ? '제동감 변화가 선택되었습니다.' : '브레이크 상태를 확인해야 합니다.', action: input.brakeStatus === 'none' ? '다음 정기 점검 때 마모 상태를 확인하세요.' : '안전을 위해 전문 정비 점검을 권장합니다.' },
  ];
  items.sort((a, b) => statusRank[a.status] - statusRank[b.status]);
  return { items, summaryCount: items.filter((item) => item.status !== 'OK').length, safetyNotice: items.some((item) => item.key === 'brake' && item.status === 'ATTENTION') };
}

const LIMITS = {
  distance: 10_000_000,
  fuel: 10_000,
  unitPrice: 1_000_000,
};

const toNumber = (value) => typeof value === 'number' ? value : Number(value);

export function validateFuelInputs(input) {
  const errors = {};
  const labels = { distance: '주행거리', fuel: '사용한 연료량', unitPrice: '연료 단가' };
  const particles = { distance: '는', fuel: '은', unitPrice: '는' };
  const values = Object.fromEntries(Object.keys(labels).map((key) => [key, toNumber(input[key])]));

  for (const key of Object.keys(labels)) {
    if (!Number.isFinite(values[key])) {
      errors[key] = `${labels[key]}을 숫자로 입력해 주세요.`;
    } else if (values[key] <= 0) {
      errors[key] = `${labels[key]}${particles[key]} 0보다 커야 합니다.`;
    } else if (values[key] > LIMITS[key]) {
      errors[key] = `${labels[key]}${particles[key]} ${LIMITS[key].toLocaleString('ko-KR')}${key === 'distance' ? 'km' : key === 'fuel' ? 'L' : '원/L'} 이하로 입력해 주세요.`;
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function calculateFuelCosts(input) {
  const validation = validateFuelInputs(input);
  if (!validation.valid) throw new Error('유효한 입력값이 필요합니다.');
  const distance = toNumber(input.distance);
  const fuel = toNumber(input.fuel);
  const unitPrice = toNumber(input.unitPrice);
  const totalCost = fuel * unitPrice;
  const costPerKm = totalCost / distance;
  return { fuelEconomy: distance / fuel, totalCost, costPerKm, costPer100Km: costPerKm * 100 };
}

export function isNumberValid(value: any, min?: number, max?: number) {
  if (typeof value === 'undefined' || value === null || isNaN(value) || typeof value !== 'number') {
    return false;
  }

  if (typeof min !== 'undefined' && value < min) {
    return false;
  }

  if (typeof max !== 'undefined' && value > max) {
    return false;
  }

  return true;
}

export function isStringValid(value: any) {
  if (typeof value === 'undefined' || value === null || value === '' || typeof value !== 'string') {
    return false;
  }

  return true;
}

export function isBooleanValid(value: any) {
  if (typeof value === 'undefined' || value === null || typeof value !== 'boolean') {
    return false;
  }
}

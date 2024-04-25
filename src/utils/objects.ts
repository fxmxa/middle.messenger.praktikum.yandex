type Indexed<T = any> = {
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  Object.entries(rhs).forEach(([key, value]) => {
    const valIsObj = isPlainObject(value);
    const valInLhs = Object.prototype.hasOwnProperty.call(lhs, key);
    const newVal = valInLhs && valIsObj ? merge(lhs[key], value) : value;
    // eslint-disable-next-line no-param-reassign
    lhs[key] = newVal;
  });
  return lhs;
}

export function isPlainObject(val: unknown) {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}

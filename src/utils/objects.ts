// eslint-disable-next-line import/prefer-default-export
type Indexed<T = any> = {
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  Object.entries(rhs).forEach(([key, value]) => {
    const valIsObj = isPlainObject(value);
    const valInLhs = Object.prototype.hasOwnProperty.call(lhs, key);
    const newVal = valInLhs && valIsObj ? merge(lhs[key], value) : value;
    lhs[key] = newVal;
  });
  return lhs;
}

export function isPlainObject(val: any) {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}

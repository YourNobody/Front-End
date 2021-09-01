export const getEmptyObject = <T>(data: T): T | Record<string, unknown> => {
  if (!data) return {};
  return Object.keys(data).reduce((R, key) => {
    R[key] = '';
    return R;
  }, {}) || {};
};
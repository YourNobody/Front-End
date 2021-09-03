export const getEmptyObject = <T>(data: T): T => {
  if (!data) return {} as T;
  return Object.keys(data).reduce((R, key) => {
    R[key] = '';
    return R;
  }, {}) as T || {} as T;
};
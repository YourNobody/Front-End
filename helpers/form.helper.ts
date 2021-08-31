export const getEmptyFormData = <T>(formData: T): T | Record<string, string> => {
  if (!formData) return {};
  return Object.keys(formData).reduce((R, key) => {
    R[key] = '';
    return R;
  }, {});
};
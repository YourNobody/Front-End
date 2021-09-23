export const checkForValideImageLink = (src: string): boolean => {
  if (!src) return false;
  return !!src.match(/(\.jpg|\.png|\.jpeg|\.jfif|\.gif)$/);
};

export const getFirstLetters = (initials: string): string => {
  if (!initials) return 'YOU';
  const splitted: string[] = initials.split(' ');
  if (splitted.length > 1) {
    return splitted[0][0].toUpperCase() + splitted[1][0].toUpperCase();
  } else if (splitted.length === 1) {
    return splitted[0][0].toUpperCase();
  }
  return 'YOU';
};

export const getEmptyObject = <T>(data: T): T => {
  if (!data) return {} as T;
  return Object.keys(data).reduce((R, key) => {
    if (typeof data[key] === 'function') {
      R[key] = null;
    } else if (data[key] instanceof Array) {
      R[key] = [];
    } else if (data[key] instanceof Object) {
      R[key] = {};
    } else {
      R[key] = '';
    }
    return R;
  }, {}) as T || {} as T;
};

export const getObjectWithDefinedKeys = (initial: any, keys: string[] | string): any => {  
  if (typeof keys === 'string') {
    keys = keys.split(' ');
  }
  return keys.reduce((output, key) => {
    if (initial[key]) {
      output[key] = initial[key];
    }
    return output;
  }, {});
};

export const checkForValideImageLink = (src: string): boolean => {
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
    R[key] = '';
    return R;
  }, {}) as T || {} as T;
};

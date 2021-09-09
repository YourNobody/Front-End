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

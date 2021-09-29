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

export const getObjectWithDefinedKeys = (initial: any, keys: string[] | string | Record<string, unknown>): any => {  
  if (!initial || !Object.keys(initial).length) return {};
  if (!keys) return initial;
  if (typeof keys === 'string') {
    keys = keys.split(' ');
  } else if (keys instanceof Array) {
    return keys.reduce((output, key) => {
      if (initial[key]) {
        output[key] = initial[key];
      }
      return output;
    }, {});
  }
  return Object.keys(keys).reduce((R, key) => {
    if (initial[key]) {
      R[key] = initial[key];
      return R;
    }
  }, {});
};

export const formatDate = (date: number | Date): string => {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

export const changeStatisticsTooltipLabel = (value: number | string, name: string, props: any) => {
  
  return function (oldLabel: string, newLabel: string): void {
    console.log(value, name, props);
    if (name && oldLabel) {
      props.name = newLabel + ': ' + value;
    }
  };
};
